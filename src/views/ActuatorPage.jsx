import React, { useState, useEffect } from 'react';
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import { logDict, eventLogger } from '../utils/eventLogger'
import Header from './Header';

const ActuatorPage = (props) => {

    const [actuatorData, setActuatorData] = useState({})

    useEffect(() => {
        let req = new Ajax(endpoints.ACTUATOR_PAGE, {
            params: {
                'id': props.id
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
                setActuatorData({...res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }, []) 

    return (
        <div className="actuator-page">
            <Header
                {...props}
            />
            <h1>dfasdfasd</h1>
        </div>
    );
}

export default ActuatorPage