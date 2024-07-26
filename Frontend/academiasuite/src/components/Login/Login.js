import React, { useState } from "react";
import '../../assets/styles/login.css';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isblur, setIsblur] = useState(false);

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
                loading()
                break;
        }
      };

      const loading = () => {
        setIsblur(true);
        setTimeout(() => {
            props.setActiveComponent('dashboard')
        }, 2000);
      }

    return (
        <div className={`login-container`}>
            <div className={`login-div ${isblur ? 'blur' : '' }`}>
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
            <Box sx={{ width: '50%' }} className={`no-blur ${isblur ? 'loading' : 'not-loading'}`}>
                <LinearProgress />
            </Box>
        </div>
    );
}

export default Login;