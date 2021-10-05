import React, { useState, useEffect } from 'react';
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import checkToken from '../utils/sessionCheck'
import { logDict, eventLogger } from '../utils/eventLogger'
import Header from './Header';
import moment from 'moment';
import 'moment/locale/es';
import ActuatorReadings from './ActuatorReadings';
import { tsPropertySignature } from '@babel/types';
import { Chart } from 'react-charts'

const ActuatorDiagnosis = (props) => {
    const [diagnosisOk, setDiagnosisOk] = useState(true)

    const [diagnosisChart, setDiagnosisChart] = useState({
        label: 'Funcionamiento Correcto',
        data: [
            [new Date('2021-9-5'), 1],
            [new Date('2021-9-6'), 1],
            [new Date('2021-9-8'), 1],
            [new Date('2021-9-10'), 0],
            [new Date('2021-9-11'), 1],
            [new Date('2021-9-15'), 1],
            [new Date('2021-9-18'), 1],
            [new Date('2021-9-20'), 0],
        ]
    })
    const [temperature, setTemperature] = useState({
        label: 'Temperatura',
        data: [
            [new Date('2021-9-5'), 50],
            [new Date('2021-9-6'), 55],
            [new Date('2021-9-8'), 60],
            [new Date('2021-9-10'), 70],
            [new Date('2021-9-11'), 58],
            [new Date('2021-9-15'), 60],
            [new Date('2021-9-18'), 40],
            [new Date('2021-9-20'), 30],
        ]
    })
    const [torque, setTorque] = useState({
        label: 'Torque',
        data: [
            [new Date('2021-9-5'), 20],
            [new Date('2021-9-6'), 35],
            [new Date('2021-9-8'), 70],
            [new Date('2021-9-10'), 90],
            [new Date('2021-9-11'), 8],
            [new Date('2021-9-15'), 40],
            [new Date('2021-9-18'), 35],
            [new Date('2021-9-20'), 60],
        ]
    })
    const [power, setPower] = useState({
        label: 'Alimentación',
        data: [
            [new Date('2021-9-5'), 380],
            [new Date('2021-9-6'), 380],
            [new Date('2021-9-8'), 380],
            [new Date('2021-9-10'), 378],
            [new Date('2021-9-11'), 381],
            [new Date('2021-9-15'), 380],
            [new Date('2021-9-18'), 379],
            [new Date('2021-9-20'), 382],
        ]
    })

    const getDiagnosisData = () => {
        let req = new Ajax(endpoints.GET_DIAGNOSIS + props.id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            useBaseUrl: true,
            method: 'GET',
        })
        req.result()
            .then((res) => {
                console.log(res.data)
                setDiagnosisOk(res.data[res.data.length - 1].diagnosis_ok)
                // setDiagnosisChart({
                //     label: 'Condición',
                //     data: res.data.map((e) => 
                //         [new Date(e.date), Number(e.diagnosis_ok)]
                //     )
                // })
                // setTemperature({
                //     label: 'Temperatura (°C)',
                //     data: res.data.map((e) => 
                //         [new Date(e.date), e.data[1].value]
                //     )
                // })
                // setTorque({
                //     label: 'Torque (%)',
                //     data: res.data.map((e) => 
                //         [new Date(e.date), e.data[2].value]
                //     )
                // })
                // setPower({
                //     label: 'Alimentación (V)',
                //     data: res.data.map((e) => 
                //         [new Date(e.date), e.data[0].value]
                //     )
                // })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        checkToken(() => {
            getDiagnosisData()
        })
        // eventLogger(logDict.READINGS, props.id)
    }, [])

    const diagnosisMemo = React.useMemo(() => [diagnosisChart], [diagnosisChart])
    const tempMemo = React.useMemo(() => [temperature], [temperature])
    const torqueMemo = React.useMemo(() => [torque], [torque])
    const powerMemo = React.useMemo(() => [power], [power])

    
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom'},
            { type: 'linear', position: 'left' },
        ],
        []
    )

    return (
        <div className="dashboard__body diagnosis-wrapper">
            <div className="actuator__data">
                <div className="data-wrapper">
                    <label className="actuator__title">Información del Actuador</label>
                    <div className="actuator__info">
                        <div>Nombre: {props.actuator.name}</div>
                        <div>Modelo: {props.actuator.model}</div>
                        <div>Direccion Modbus: {props.actuator.modbus_address}</div>
                    </div>
                </div>
                <div className="data-wrapper">
                    <label className="actuator__title">Diagnóstico Actual</label>
                    <div className="actuator__info diagnosis">
                        <div>{diagnosisOk ? 'Funcionamiento Correcto' : 'Propenso a Fallo'}</div>
                    </div>
                </div>
            </div>
            <div className="diagnosis__chart-wrapper">
                <div className="diagnosis__chart">
                    <div className="chart__title">Condición</div>
                    <Chart data={diagnosisMemo} axes={axes} tooltip />
                </div>
                <div className="diagnosis__chart">
                    <div className="chart__title">Temperatura</div>
                    <Chart data={tempMemo} axes={axes} tooltip />
                </div>
                <div className="diagnosis__chart">
                    <div className="chart__title">Torque</div>
                    <Chart data={torqueMemo} axes={axes} tooltip />
                </div>
                <div className="diagnosis__chart">
                    <div className="chart__title">Alimentación</div>
                    <Chart data={powerMemo} axes={axes} tooltip />
                </div>
            </div>
        </div>
    )
}

export default ActuatorDiagnosis;