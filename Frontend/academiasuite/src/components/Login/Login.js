import React, { useState } from "react";
import { Input } from '@mui/base/Input';
import '../../assets/styles/login.css'

const Login = (props) => {
    return (
        <div className="login-container">
            <div className="login-div">
                <div>
                    <h3>LOGIN</h3>
                </div>
                <div>
                    <input className="input-field" type="text" placeholder="Username"></input>
                </div>
                <div>
                    <input className="input-field" type="password" placeholder="Password"></input>
                </div>
                <div className="btn-login-div">
                    <button className="btn-login" onClick={ () => {
                        props.setActiveComponent('dashboard');
                    }}>LOGIN</button>
                </div>
            </div>
        </div>
    );
}

export default Login;