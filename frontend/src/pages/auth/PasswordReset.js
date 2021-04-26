import React, { useState, useContext } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { baseBackendUrl } from '../../urls';
import { MessageContext } from '../../MessageContext';


function PasswordReset() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useContext(MessageContext);

    const emailSubmit = e => {
        e.preventDefault();

        const data = {
            'email': email
        }

        axios.post(`${baseBackendUrl}/users/password/reset/`, data)
        .then(res=> {
            setMessage(['Check email']);
        }).catch(err => {
            setMessage(['An error occured.']);
            console.log(err);
        });
    }

    return (
        <Form onSubmit={emailSubmit}>
            <FormControl type="text" placeholder='email' className='mr-sm-2' value={email} onChange={e => setEmail(e.target.value)}></FormControl>
            <Button variant='outline-success' type='submit'>Submit</Button>
        </Form>
    )
}

export default PasswordReset;