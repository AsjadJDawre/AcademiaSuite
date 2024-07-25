import React, { useState } from "react";
import '../../assets/styles/login.css'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();   
        loginUser();
    }
    
    const loginUser = async () => {
        const user = await window.api.invoke('login-user', {username, password});
        
        switch (user) {
            case 'IP':
                setMessage("*Invalid Password!")
                break;
            case 'UNF':
                setMessage("*User not found!")
                break;
            case 'DE':
                setMessage("*Database Error!")
                break;
            default:
                props.setUser(user.username);
                console.log(user.username);
                props.setActiveComponent('dashboard')
                break;
        }
      };

    return (
        <div className="login-container">
            <div className="login-div">
                <div>
                    <h3>LOGIN</h3>
                </div>
                <form onSubmit={handleSubmit}>
                        <input className="input-field if-username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                        <input className="input-field if-password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <p className="error-msg">{message}</p>
                        <button type="submit" className="btn-login" >LOGIN</button>
                </form>
            </div>
        </div>
    );
}

export default Login;