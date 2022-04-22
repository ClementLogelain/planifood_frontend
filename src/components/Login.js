import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import * as service from  "../services/AuthService";
import { useContext } from "react";
import Context from "../context/context";
import "../styles/Auth.css";
import { TextField } from '@mui/material';
  
function Login() {

    const { setToken, setUser } = useContext(Context);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        const userData = {
            username: username,
            password: password
        };

        service.Login(userData).then((res) =>{
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
        });
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
 
    return (
        <div className='auth'>
            <div className='auth-input'>
                <h2 className='text-center'>Connectez vous</h2>
                    <div className='auth-field'>
                        <TextField id='username' label="Nom d'utilisateur" variant="filled" onChange={handleUsername}></TextField>
                    </div>
                    <div className='auth-field'>
                        <TextField id='password' label="Mot de passe" variant="filled"  onChange={handlePassword}></TextField>
                    </div>

                    <Button className='auth-submit' variant="danger" type="submit" onClick={submit}>
                        Se connecter
                    </Button>
                <p>Pas de compte ? Créez-en un <a href='/register'>ici</a></p>
            </div>
        </div>);
}

export default Login;
