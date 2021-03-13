import React from 'react';
import checkToken from '../utils/sessionCheck'
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'

const Dashboard = () => {

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
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <button onClick={() => {checkToken(getActuators)}}>Get actuators</button>
        </div>
    );

}

export default Dashboard;