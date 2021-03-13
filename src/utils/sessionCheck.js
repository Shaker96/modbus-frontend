import Ajax from './Ajax'
import jwt from 'jsonwebtoken'
import endpoints from '../endpoints/index'
import LocalStorageService from './localStorageService'

const lss = LocalStorageService.getService()

const checkToken = (callback = () => {}) => {   
    var isExpired = false;
    const token = lss.getAccessToken();
    var decodedToken = jwt.decode(token, { complete: true });
    var dateNow = new Date();
    if (decodedToken.payload.exp * 1000 < dateNow.getTime()) {
        console.log('checkToken', dateNow.getTime(), decodedToken.payload.exp * 1000);
        isExpired = true;
        let refresh = new Ajax(endpoints.REFRESH, {
            useBaseUrl: true,
            method: 'POST',
            body: { refresh: lss.getRefreshToken()}
        })
        refresh.result()
            .then((res) => {
                lss.setToken(res)
                callback()
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        callback()
    }

}

export default checkToken
