import React, { useState, useEffect } from 'react';
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import checkToken from '../utils/sessionCheck'
import { logDict, eventLogger } from '../utils/eventLogger'
import InfiniteScroll from 'react-infinite-scroller';
import Header from './Header';
import moment from 'moment';
import 'moment/locale/es';
import CsvDownloader from 'react-csv-downloader';

const ActuatorReadings = (props) => {

  const [readings, setReadings] = useState({
    dates: [],
    values: [],
  })

  const [registers, setRegisters] = useState([])

  const [selectedRegisters, setSelectedRegisters] = useState([])

  const [dateFrom, setDateFrom] = useState(moment().subtract(1, 'weeks').format('YYYY-MM-DD'))
  const dateFromHandler = (e) => setDateFrom(e.target.value);

  const [dateTo, setDateTo] = useState(moment().format('YYYY-MM-DD'))
  const dateToHandler = (e) => setDateTo(e.target.value);

  const [csv, setCsv] = useState({
    columns: [],
    data: []
  })

  const [triggerCsv, setTriggerCsv] = useState(false)

  const getReadings = () => {
    let req = new Ajax(endpoints.READINGS, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      useBaseUrl: true,
      method: 'POST',
      body: {
        'actuator_id': props.id,
        'date_from': dateFrom,
        'date_to': dateTo,
      }
    })
    req.result()
      .then((res) => {
        let newDates = res.results.map((elem) => elem.date)
        let newValues = res.results.map((elem) => elem.value_set)

        if (registers.length === 0) {
          let registersList = res.results[0] ? res.results[0].value_set.map((elem, i) => {
            return {
              'index': i,
              'name': elem.register.description
            }
          }) : []
          setRegisters(registersList)
        }
        setReadings({
          dates: newDates,
          values: newValues
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const triggerDownload = () => {
    getReadings()
    setTriggerCsv(true)
  }

  const downloadCsv = () => {
    let csvData = []
    let colsObj = [{ id: 'date', displayName: 'Fecha' }]
    readings.dates.map((date, index) => {
      let obj = { date: date }
      readings.values[index].map((value, i) => {
        if (selectedRegisters.includes(i) || selectedRegisters.length == 0) {
          if (index === 0) {
            colsObj.push({ id: `col${i}`, displayName: value.register.description })
          }
          obj['col' + i] = value.register.bit_number != null ?
            value.value :
            value.value + ' ' + value.register.unit
        }
      })
      csvData.push(obj)
    })
    setCsv({ columns: colsObj, data: csvData })
    setTriggerCsv(false)
    setTimeout(() => document.getElementById('csv-download').click())
  }

  useEffect(() => {
    if (triggerCsv) downloadCsv()
  }, [readings])

  const chooseRegister = (index = null) => {
    if (index === null) {
      setSelectedRegisters([])
      return
    }

    if (selectedRegisters.includes(index)) {
      setSelectedRegisters(
        selectedRegisters.filter((i) => {
          if (i != index) return true
        })
      )
      return
    }

    setSelectedRegisters([...selectedRegisters, index])
  }

  useEffect(() => {
    checkToken(() => {
      getReadings()
    })
    eventLogger(logDict.READINGS, props.id)
  }, [])

  return (
    <div className="dashboard__body readings-page">
      <div className="dashboard__left-panel">
        <div className="actuator__data">
          <label className="actuator__title">Información del Actuador</label>
          <div className="actuator__info">
            <div>Nombre: {props.actuator.name}</div>
            <div>Modelo: {props.actuator.model}</div>
            <div>Direccion Modbus: {props.actuator.modbus_address}</div>
          </div>
        </div>

        <div className="date-filter">
          <div className="date-filter__from form__field">
            <label htmlFor="from">Fecha de Inicio</label>
            <input type="date" name="from" value={dateFrom} onChange={dateFromHandler} />
          </div>
          <div className="date-filter__to form__field">
            <label htmlFor="to">Fecha de Fin</label>
            <input type="date" name="to" value={dateTo} onChange={dateToHandler} />
          </div>
          <div className="date-filter__buttons">
            <button className="date-filter__button form__button" onClick={() => getReadings()}>Buscar</button>
            <button className="date-filter__button form__button" onClick={() => triggerDownload()}>Descargar</button>
            <CsvDownloader
              filename='Registro_Modbus'
              suffix={true}
              separator=";"
              columns={csv.columns}
              datas={csv.data}
            >
              <button id="csv-download"></button>
            </CsvDownloader>
          </div>
        </div>
        <div className="scroll-list">
          <label className="scroll-list__title">Seleccione uno o mas registros</label>
          <div className="scroll-panel">
            <div className="scroll-list__container">
              <div
                className={"scroll-list__item register" + (selectedRegisters.length == 0 ? ' selected' : '')}
                key={'register-all'}
                onClick={() => chooseRegister()}
              >
                <div className="scroll-list__content register">
                  <div className="register__date">
                    Todos los registros
                  </div>
                </div>
              </div>
              {registers.map((elem, index) => {
                return (
                  <div
                    className={"scroll-list__item" + (selectedRegisters.includes(index) ? ' selected' : '')}
                    key={'register-' + index}
                    onClick={() => chooseRegister(index)}
                  >
                    <div className="scroll-list__content register">
                      <div className="register__name">
                        {elem.name}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__right-panel">
        <div className="dashboard__actuators">
          <label className="actuators__title">Lecturas del Actuador</label>
          <div className="actuators__wrapper scroll-panel">
            <div className="readings__list">
              {readings.dates.map((date, i) => {
                return (
                  <div className="readings__block" key={'reading-block-' + i}>
                    <div className="block__date">
                      {moment(date).format('DD-MM-YYYY hh:mm a')}
                    </div>
                    <div className="block__value-list">
                      {readings.values[i].map((value, i) => {
                        if (selectedRegisters.includes(i) || selectedRegisters.length == 0)
                          return (
                            <div className="block__item" key={'item-' + i}>
                              <div className="block block__name">{value.register.description}</div>
                              <div className="block block__value">
                                {value.register.bit_number != null ?
                                  <div className={'value value--' + value.value} /> :
                                  value.value + ' ' + value.register.unit
                                }
                              </div>
                            </div>
                          )
                      })}
                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActuatorReadings