import React, { useState, useEffect } from 'react';
import checkToken from '../utils/sessionCheck'
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import ActuatorCard from './ActuatorCard'
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import 'moment/locale/es';
import Header from './Header';

const Dashboard = (props) => {
  const [actuators, setActuators] = useState([])
  const [alerts, setAlerts] = useState({
    list: [],
    currentPage: 1,
    hasMore: true
  })
  const [events, setEvents] = useState({
    list: [],
    currentPage: 1,
    hasMore: true
  })

  const getActuators = () => {
    let req = new Ajax(endpoints.ACTUATORS, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      useBaseUrl: true,
      method: 'GET',
    })
    req.result()
      .then((res) => {
        setActuators(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getEvents = () => {
    let req = new Ajax(endpoints.EVENTS, {
      params: {
        'size': 5,
        'page': events.currentPage
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      useBaseUrl: true,
      method: 'GET'
    })
    req.result()
      .then((res) => {
        console.log(res.results)
        setEvents({
          list: [...events.list, ...res.results],
          currentPage: res.next !== null ? events.currentPage + 1 : events.currentPage,
          hasMore: res.next !== null ? true : false
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getAlerts = () => {
    let req = new Ajax(endpoints.ALERTS, {
      params: {
        'size': 5,
        'page': alerts.currentPage
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      useBaseUrl: true,
      method: 'GET'
    })
    req.result()
      .then((res) => {
        console.log(res.results)
        setAlerts({
          list: [...alerts.list, ...res.results],
          currentPage: res.next !== null ? alerts.currentPage + 1 : alerts.currentPage,
          hasMore: res.next !== null ? true : false
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const formatDate = (date) => {
    let fdate = moment(date)
    moment.locale('es')
    return fdate.locale(false).fromNow()
  }

  useEffect(() => {
    checkToken(() => {
      getActuators()
    })
  }, [])

  return (
    <div className="dashboard main-content">
      <Header
        {...props}
      />
      <div className="dashboard__body">
        <div className="dashboard__left-panel">
          <div className="scroll-list scroll-list--alerts">
            <label className="scroll-list__title">Alertas</label>
            {/* <a href="#" className="scroll-list__link">Ver Todos</a> */}
            <div className="scroll-panel">
              <InfiniteScroll
                pageStart={1}
                loadMore={() => { getAlerts() }}
                hasMore={alerts.hasMore}
                loader={<div className="loader" key={alerts.currentPage}>Loading ...</div>}
                useWindow={false}
                threshold={5}
                className="scroll-list__container"
              >
                {alerts.list.map((alert, index) => {
                  return (
                    <div className="scroll-list__item" key={'alert-' + index}>
                      <div className="scroll-list__color-bar scroll-list__color-bar--orange"></div>
                      <div className="scroll-list__content alert">
                        <h3>{alert.actuator}</h3>
                        <p>{alert.description}</p>
                        <div className="alert__date">
                          {formatDate(alert.date)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </InfiniteScroll>
            </div>
          </div>
          <div className="scroll-list scroll-list--events">
            <label className="scroll-list__title">Eventos</label>
            {/* <a href="#" className="scroll-list__link">Ver Todos</a> */}
            <div className="scroll-panel">
              <InfiniteScroll
                pageStart={1}
                loadMore={() => { getEvents() }}
                hasMore={events.hasMore}
                loader={<div className="loader" key={events.currentPage}>Loading ...</div>}
                useWindow={false}
                threshold={5}
                className="scroll-list__container"
              >
                {events.list.map((event, index) => {
                  return (
                    <div className="scroll-list__item" key={'event-' + index}>
                      <div className="scroll-list__color-bar scroll-list__color-bar--green"></div>
                      <div className="scroll-list__content event">
                        <p className='event__description'>{event.event}</p>
                        {event.actuator ? <div className='event__actuator'>Actuador: {event.actuator}</div> : null}
                        {event.user ? <div className='event__user'>Usuario: {event.user}</div> : null}
                        <div className="event__date">
                          {formatDate(event.log_date)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <div className="dashboard__right-panel">
          <div className="dashboard__actuators">
            <label className="actuators__title">Red de Actuadores</label>
            <div className="actuators__wrapper">
              <div className="actuators__body scroll-panel">
                {actuators.map((actuator, index) => {
                  return (
                    <ActuatorCard
                      actuator={actuator}
                      key={'actuator-card-' + index}
                    />
                  )
                })}
                {actuators.map((actuator, index) => {
                  return (
                    <ActuatorCard
                      actuator={actuator}
                      key={'actuator-card-' + index}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={() => {checkToken(getActuators)}}>Get actuators</button> */}
    </div>
  );

}

export default Dashboard;