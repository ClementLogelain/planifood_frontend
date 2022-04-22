import React, { useState, useEffect, useMemo } from 'react';
import { Button} from 'react-bootstrap';
import "../styles/Auth.css";
import * as service from "../services/AuthService";
import { useContext } from "react";
import Context from "../context/context";
import { TextField } from '@mui/material';


function Register() {

    const { setToken, setUser } = useContext(Context);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfrim, setPasswordConfirm] = useState('');

    const [userRegistered, setUserRegistered] = useState('');

    const userRegister = {
        username: userName,
        email: email,
        password: password
    };

    const userLoad = useMemo(() => { 
        return {
            username: userName,
            password: password
        }
    }, [userName,password]);

    const submit = () => {
        if(verifyPasswords){
            service.Register(userRegister).then((res) => {
                setUserRegistered(res.data);
            });
        }
    };
    
    useEffect(() => {
        async function fetch(){
            if(userRegistered){
                service.Login(userLoad).then((res) => {
                    setToken(res.data.token);
                    setUser(res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    localStorage.setItem('token', res.data.token);
                });
            }
        }
        fetch();
    }, [userRegistered, setToken, setUser,userLoad]);

    const handleUsername = (e) => {
        setUserName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    function verifyPasswords() {
        return password === passwordConfrim;
    }
 
    return (
        <div className='auth'>
            <div className='auth-input'>
                <h2 className='text-center'>Inscrivez vous</h2>
                    <div className='auth-field'>
                        <TextField id='username' label="Nom d'utilisateur" variant="filled" onChange={handleUsername}></TextField>
                    </div>
                    <div className='auth-field'>
                        <TextField id='email' label="E-mail" variant="filled"  onChange={handleEmail}></TextField>
                    </div>
                    <div className='auth-field'>
                        <TextField id='password' label="Mot de passe" variant="filled" onChange={handlePassword}></TextField>
                    </div>
                    <div className='auth-field'>
                        <TextField id='password-confirm' label="Confirmez le mot de passe" variant="filled"  onChange={handlePasswordConfirm}></TextField>
                    </div>

                    <Button className='auth-submit' variant="danger" type="submit" onClick={submit}>
                        S'inscrire
                    </Button>
                <p>Pas de compte ?</p>
                <p>Créez-en un <a href='/register'>ici</a></p>
            </div>
        </div>);
}

export default Register;
