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

    const tabs = [
        {
            name: 'Lecturas',
            component: ActuatorReadings,
            props: {
                id: props.match.params.id
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
                id: props.match.params.id
            }
        }
    ]

    let CurrentComponent = tabs[tabNumber].component
    

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