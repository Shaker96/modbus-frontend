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

const ActuatorMovement = (props) => {

    const [position, setPosition] = useState(0)
    const [inputHidden, setInputHidden] = useState(true)

    const opts = [
        {
            id: 'open',
            name: 'Abrir',
            value: 0,
            post_value: 100
        },
        {
            id: 'closed',
            name: 'Cerrar',
            value: 1,
            post_value: 0
        },
        {
            id: 'stop',
            name: 'Detener',
            value: 2,
            post_value: 512
        },
        {
            id: 'set-pos',
            name: 'Porcentaje de Apertura (1-99)',
            value: 3,
        },
    ]

    const readRadios = () => {
        setInputHidden(!document.getElementById('set-pos').checked)
    }

    const handleMovement = (e) => {
        e.preventDefault();
        let post_value = 0
        let checked = document.querySelector('input:checked')

        if (checked.value === '3') {
            post_value = document.getElementById('percentage').value
        } else {
            post_value = opts[checked.value].post_value
        }

        let movementData = {
            position: post_value,
            address: props.actuator.modbus_address
        }

        checkToken(() => {
            let req = new Ajax(endpoints.MOVE_ACTUATOR, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                useBaseUrl: true,
                method: 'POST',
                body: { ...movementData }
            })
            req.result()
                .then((res) => {
                    
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <div className="dashboard__body center-box-container movement-wrapper">
            <div className="center-box movement">
                <div className="center-box__title">Operación Manual</div>
                <div className="actuator__info">
                    <div>Nombre: {props.actuator.name}</div>
                    <div>Modelo: {props.actuator.model}</div>
                    <div>Direccion Modbus: {props.actuator.modbus_address}</div>
                </div>
                <form onSubmit={handleMovement}>
                    <div className="radio-group">
                    {
                        opts.map((elem, i) => {
                            return (
                                <div className="radio__item" key={i}>
                                    <input type="radio" id={elem.id} name="position" defaultChecked={elem.value === 0} value={elem.value} onClick={() => readRadios()}/>
                                    <label htmlFor={elem.id}>{elem.name}</label>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className={`form__field ${inputHidden ? 'hidden' : ''}`}>
                        <label htmlFor="percentage">Porcentaje de apertura (1-99)</label>
                        <input required type="number" min="1" max="99" defaultValue="50" id="percentage"></input>
                    </div>
                    <button type="submit" className="form__button">Realizar Operación</button>
                </form>
            </div>
        </div>
    )
}

export default ActuatorMovement;