import React, { useState } from 'react';
import '../styles/login.scss'

const Login = () => {
    const [loginData, setLoginData] = useState({username: "", password: ""})
    const formValues = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    } 

    const printLogin = (event) => {
        event.preventDefault()
        console.log(loginData)
    }

    return (
        <div className="login">
            <h1 className="login__title">Inicia Sesion</h1>
            <form onSubmit={printLogin}>
                <div className="login__field">
                    <label className="login__label" htmlFor="username">Usuario</label>
                    <input className="login__input" type="text" name="username" onChange={formValues}></input>
                </div>
                <div className="login__field">
                    <label className="login__label" htmlFor="password">Contraseña</label>
                    <input className="login__input" type="password" name="password" onChange={formValues}></input>
                </div>
                <button type="submit" className="login__button">Login</button>
            </form>
        </div>
    );
} 

export default Login;