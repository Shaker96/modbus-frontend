import React, { useState, useEffect } from 'react';
import checkToken from '../utils/sessionCheck'
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import ActuatorCard from './ActuatorCard'

const Dashboard = () => {
    const [actuators, setActuators] = useState([])

    const getActuators = () => {
        console.log('get actuators', Ajax.token)
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
                console.log('res', res)
                setActuators(res)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        checkToken(getActuators)
    })

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1 className="dahboard__title">Dashboard</h1>
                <nav className="dashboard__nav">
                    <a href="#">Panel de Control</a>
                    <a href="#">Cerrar Sesión</a>
                </nav>
            </div>
            <div className="dashboard__body">
                <div className="dashboard__left-panel">
                    <div className="dashboard__alerts"></div>
                    <div className="dashboard__events"></div>
                </div>
                <div className="dashboard__right-panel">
                    <div className="dashboard__actuators">
                        <h2 className="actuators__title"></h2>
                        <div className="actuators__body">
                            {actuators.map((actuator) => {
                                console.log(actuator);
                                return (
                                    <ActuatorCard 
                                        actuator= {actuator}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* <button onClick={() => {checkToken(getActuators)}}>Get actuators</button> */}
        </div>
    );

}

export default Dashboard;