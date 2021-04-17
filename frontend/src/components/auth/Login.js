import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, FormControl, Button } from 'react-bootstrap';
import { baseBackendUrl } from '../../urls';
import { TokenContext } from '../../TokenContext';
import { MessageContext } from '../../MessageContext';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useContext(TokenContext);
    const [message, setMessage] = useContext(MessageContext);

    const displayErrors = (e) => {
        setMessage([]);
        const msgList = [];
        for (const [key, value] of Object.entries(e)) {
            console.log(`${key}: ${value}`);
            setMessage([...msgList, value]);
        }
    }

    const handleLoginSubmit = e => {
        e.preventDefault();

        const loginData = {
            'email': email,
            'password': password,
        }

        axios.post(`${baseBackendUrl}/users/login/`, loginData)
        .then(res => {
            let authToken = localStorage.setItem('token', res.data.key);
            setToken(authToken);
            setMessage(['Successfully logged in!']);

        }).catch(err => {
            setMessage([]);
            displayErrors(err.response.data);
        });
    }

    return (
        <>
        <Form inline onSubmit={handleLoginSubmit}>
            <FormControl type="text" placeholder='email' className='mr-sm-2' value={email} onChange={e => setEmail(e.target.value)}></FormControl>
            <FormControl type='password' placeholder='password' className='mr-sm-2' value={password} onChange={e => setPassword(e.target.value)}></FormControl>
            <Button variant='outline-success' type='submit'>Login</Button>
        </Form>
        <button onClick={() => setMessage(["Hi from button!"])}>Button!</button>
        </>
    )
}

export default Login;