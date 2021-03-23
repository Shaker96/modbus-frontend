import React, { useState, useEffect } from 'react';
import checkToken from '../utils/sessionCheck'
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import ActuatorCard from './ActuatorCard'
import InfiniteScroll from 'react-infinite-scroller';

const Dashboard = () => {
    const [actuators, setActuators] = useState([])
    const [alerts, setAlerts] = useState({
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

    useEffect(() => {
            checkToken(() => { 
                getActuators() 
            })
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1 className="dashboard__title">Diagnóstico Modbus</h1>
                <nav className="dashboard__nav">
                    <a href="#">
                        <span className="nav__text desktop-only">Panel de Control</span>
                        <span className="nav__icon mobile-only">PC</span>
                    </a>
                    <a href="#">
                        <span className="nav__text desktop-only">Cerrar Sesión</span>
                        <span className="nav__icon mobile-only">CS</span>
                    </a>
                </nav>
            </div>
            <div className="dashboard__body">
                <div className="dashboard__left-panel">
                    <div className="scroll-list scroll-list--alerts">
                        <label className="scroll-list__title">Alertas</label>
                        <a href="#" className="scroll-list__link">Ver Todos</a>
                        <div className="scroll-list__container scroll-panel">
                            <InfiniteScroll
                                pageStart={1}
                                loadMore={() => { getAlerts() }}
                                hasMore={alerts.hasMore}
                                loader={<div className="loader" key={alerts.currentPage}>Loading ...</div>}
                                useWindow={false}
                                threshold={5}
                            >
                                {alerts.list.map((alert, index) => {
                                    return (
                                        <div className="scroll-list__item" key={'alert-' + index}>
                                            <div className="scroll-list__color-bar scroll-list__color-bar--orange"></div>
                                            <div className="scroll-list__content">
                                                <p>{alert.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </InfiniteScroll>
                        </div>
                    </div>
                    <div className="scroll-list scroll-list--events">
                        <label className="scroll-list__title">Eventos</label>
                        <a href="#" className="scroll-list__link">Ver Todos</a>
                        <div className="scroll-list__container scroll-panel">
                            {[1, 2, 3, 4, 5, 6].map((n) => {
                                return (
                                    <div className="scroll-list__item" key={n}>
                                        <div className="scroll-list__color-bar scroll-list__color-bar--green"></div>
                                        <div className="scroll-list__content">
                                            <p>Evento numero {n}</p>
                                        </div>
                                    </div>
                                )
                            })}
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
                                            actuator= {actuator}
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