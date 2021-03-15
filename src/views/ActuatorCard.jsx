import React from 'react'

const ActuatorCard = (props) => {
         
    return (
        <div className="actuator-card">
            <div className="actuator-card__header">
                <img src={require('../assets/img/actuator-icon.svg')} alt='actuator-icon'></img>
                <h2>{props.actuator.name}</h2>
            </div>
            <div className="actuator-card__data-list">
                {props.actuator.data.map((act, index) => {
                    return (
                        <div className="actuator-card__data-item" key={'actuator-' + index}>
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