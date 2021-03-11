import React, { useState } from 'react';
import endpoints from '../endpoints/index';
import Ajax from '../utils/Ajax';
Ajax.baseUrl = 'http://127.0.0.1:8000/api/';

const Login = () => {
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
                </form>
            </div>
        </div>
    );
} 

export default Login;