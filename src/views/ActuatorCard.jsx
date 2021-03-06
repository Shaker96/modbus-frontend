import React, { useState } from 'react'
import { Link } from "react-router-dom";


const ActuatorCard = (props) => {
    const [redirect, setRedirect] = useState(false)

    // if (redirect) {
    //     return (
    //         <Redirect to={"/actuator/" + props.actuator.id}/>
    //     )
    // } else {
        return (
            <Link className="actuator-card" 
                to={"/actuator/" + props.actuator.id}>
                <div className="actuator-card__header">
                    <img src={require('../assets/img/actuator-icon.svg')} alt='actuator-icon'></img>
                    <div className="actuator-card__name">
                        <h2>{props.actuator.name}</h2>
                        <span>Modelo: {props.actuator.model}</span>
                    </div>
                </div>
                <div className="actuator-card__data-list">
                    {props.actuator.data.map((act, index) => {
                        return (
                            <div className="actuator-card__data-item" key={'actuator-' + index}>
                                <span className="actuator-card__item-label">
                                    {act.name}:
                                </span>
                                <span className="actuator-card__item-content">
                                    {act.value}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </Link>
        )
    // }

}

export default ActuatorCard