import React, { useEffect } from 'react'

const ActuatorCard = (props) => {
         
    return (
        <div className="actuator-card">
            <div className="actuator-card__header">
                <img src='../assets/actuator-green.svg'></img>
                <h2>{props.actuator.name}</h2>
            </div>
            <div className="actuator-card__data-list">
                {props.actuator.data.map((act) => {
                    return (
                        <div className="actuator-card__data-item">
                            <span className="actuator-card__item-label">
                                {act.name}
                            </span>
                            <span className="actuator-card__item-content">
                                {act.value}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ActuatorCard