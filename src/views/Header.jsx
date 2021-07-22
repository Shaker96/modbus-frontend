import React, { useState, useEffect } from 'react';
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import { logDict, eventLogger } from '../utils/eventLogger'

const Header = (props) => {
    let redirect = false;

    const logout = () => {
        let req = new Ajax(endpoints.LOGOUT, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            useBaseUrl: true,
            method: 'POST',
            body: { refresh: localStorage.getItem('refresh') }
        })
        req.result()
            .then((res) => {
                console.log('sesion cerrada')
                localStorage.clear()
                eventLogger(logDict.LOGOUT)
                Ajax.token = ''
                props.setIsLogged(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className="header">
            <h1 className="header__title">Diagnóstico Modbus</h1>
            <nav className="header__nav">
                {/* <a href="#">
                    <span className="nav__text desktop-only">Panel de Control</span>
                    <span className="nav__icon mobile-only">PC</span>
                </a> */}
                <a href="#" onClick={logout}>
                    <span className="nav__text desktop-only">Cerrar Sesión</span>
                    <span className="nav__icon mobile-only"><img src={require('../assets/img/logout.svg')}/></span>
                </a>
            </nav>  
        </div>
    );
}

export default Header