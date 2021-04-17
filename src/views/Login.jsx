import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import endpoints from '../endpoints/index';
import Ajax from '../utils/Ajax';
import LocalStorageService from '../utils/localStorageService';
import {logDict, eventLogger} from '../utils/eventLogger'

const localStorageService = LocalStorageService.getService();

const Login = (props) => {
    const [loginData, setLoginData] = useState({username: "", password: ""});

    const formValues = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    } 
    
    const handleLogin = async (event) => {
        event.preventDefault()
        let req = new Ajax(endpoints.LOGIN, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            useBaseUrl: true,
            method: 'POST',
            body: {...loginData}
        })
        req.result()
            .then((res) => {
                console.log('res', res)
                localStorageService.setToken(res)
                props.setIsLogged(true);
                eventLogger(logDict.LOGIN)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="login-container">
            <div className="login">
                <div className="login__title">Inicia Sesión</div>
                <form onSubmit={handleLogin}>
                    <div className="login__field">
                        <label className="login__label" htmlFor="username">Usuario</label>
                        <input className="login__input" required type="text" name="username" onChange={formValues}></input>
                    </div>
                    <div className="login__field">
                        <label className="login__label" htmlFor="password">Contraseña</label>
                        <input className="login__input" required type="password" name="password" onChange={formValues}></input>
                    </div>
                    <button type="submit" className="login__button">Entrar</button>
                    {props.isLogged ? <Redirect to='/dashboard' /> : null} 
                </form>
            </div>
        </div>
    );
} 

export default Login;