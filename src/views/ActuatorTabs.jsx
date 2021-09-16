import React, { useState, useEffect } from 'react';
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import checkToken from '../utils/sessionCheck'
import { logDict, eventLogger } from '../utils/eventLogger'
import Header from './Header';
import moment from 'moment';
import 'moment/locale/es';
import ActuatorReadings from './ActuatorReadings';
import ActuatorDiagnosis from './ActuatorDiagnosis';
import ActuatorMovement from './ActuatorMovement';
import { tsPropertySignature } from '@babel/types';

const ActuatorTabs = (props) => {

    const [tabNumber, setTabNumber] = useState(0)
    const [actuator, setActuator] = useState({
        name: '',
        model: '',
        modbus_address: '',
    })

    const tabs = [
        {
            name: 'Lecturas',
            component: ActuatorReadings,
            props: {
                id: props.match.params.id,
                actuator: actuator
            }
        },
        {
            name: 'Diagnóstico',
            component: ActuatorDiagnosis,
            props: {
                id: props.match.params.id
            }
        },
        {
            name: 'Operación Manual',
            component: ActuatorMovement,
            props: {
                id: props.match.params.id,
                actuator: actuator
            }
        }
    ]

    let CurrentComponent = tabs[tabNumber].component
    
    const getActuatorData = () => {
        let req = new Ajax(endpoints.ACTUATOR + props.match.params.id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            useBaseUrl: true,
            method: 'GET'
        })
        req.result()
            .then((res) => {
                setActuator(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        checkToken(() => {
            getActuatorData()
        })
    }, [])

    return (
        <div className="actuator-page main-content">
            <Header
                {...props}
            />
            <div className="tabs">
                {
                    tabs.map((elem, i) => {
                        return (
                        <span
                            key={i}
                            className={`tabs__elem ${tabNumber == i ? 'tabs__elem--selected' : ''}`}
                            onClick={() => setTabNumber(i)}>
                            {elem.name}
                        </span>
                        )
                    })
                }
            </div>
            {
                <CurrentComponent
                    {...tabs[tabNumber].props}
                />
            }
        </div>
    )
}

export default ActuatorTabs;