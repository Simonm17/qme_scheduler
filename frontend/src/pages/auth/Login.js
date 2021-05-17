import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, FormControl, Button } from 'react-bootstrap';
import { baseBackendUrl } from '../../urls';
import { TokenContext } from '../../TokenContext';
import { MessageContext } from '../../MessageContext';
import ResendEmail from '../../components/auth/ResendEmail';
import { Link, useHistory } from 'react-router-dom'; 
import GoogleLogin from '../../components/auth/GoogleLogin';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useContext(TokenContext);
    const [message, setMessage] = useContext(MessageContext);

    let history = useHistory();

    const displayErrors = (e) => {
        setMessage([]);
        for (const [key, value] of Object.entries(e)) {
            console.log(`${key}: ${value}`);

            if (value === 'E-mail is not verified.') {
                setMessage(prev => [...prev, [value, <ResendEmail email={email}/>]]);
            } else {
                setMessage(prev => [...prev, [value]]);
            }
        }


    }

    const handleLoginSubmit = async(e) => {
        e.preventDefault();

        const loginData = {
            'email': email,
            'password': password,
        }
        // axios.defaults.withCredentials = true;
        await axios({
            method: 'post',
            withCredentials: true,
            url: `${baseBackendUrl}/users/dj-rest-auth/login/`, 
            data: loginData})
        .then(res => {
            console.log(res.data);
            let access_token = localStorage.setItem('access_token', res.data.access_token);
            let refresh_token = localStorage.setItem('refresh_token', res.data.refresh_token);
            setMessage(['Successfully logged in!']);
            history.push('/dashboard');

        }).catch(err => {
            if (!err.response) {
                setMessage(['Not connected to database servers. Please try again later.']);
                
            } else {
                // displayErrors(err.response.data);
                console.log(err);
            }
        });
    }

    return (
        <>
            <Form inline onSubmit={handleLoginSubmit}>
                <FormControl type="text" placeholder='email' className='mr-sm-2' value={email} onChange={e => setEmail(e.target.value)} required></FormControl>
                <FormControl type='password' placeholder='password' className='mr-sm-2' value={password} onChange={e => setPassword(e.target.value)} required></FormControl>
                <Button variant='outline-success' type='submit'>Login</Button>
            </Form>
            <small className="text-sm">Forgot password? <Link to='password/reset'>reset password</Link></small>
            <GoogleLogin />
        </>
    )
}

export default Login;