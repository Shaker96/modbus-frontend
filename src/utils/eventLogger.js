import endpoints from '../endpoints/index'
import Ajax from './Ajax'

export const logDict = {
    LOGIN: 0,
    LOGOUT: 1,
    SIGNUP: 2,
    ACTUATOR: 3,
    READING: 4,
}

export const eventLogger = (type, actuator = null) => {
    let body = actuator ? { type, actuator } : { type } 
    
    let log = new Ajax(endpoints.CREATE_EVENT, {
        useBaseUrl: true,
        method: 'POST', 
        body: body
    })

    log.result()
        .then((res) => {
            console.log('log listo')
        })
        .catch((error) => {
            eventLogger(type)
        })
}
