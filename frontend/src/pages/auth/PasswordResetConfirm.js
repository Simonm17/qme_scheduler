import React, { useState, useContext } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { MessageContext } from '../../MessageContext';
import { baseBackendUrl } from '../../urls';
import axios from 'axios';


// TODO: ADD FORM VALIDATIONS!! Needs to replace Message component rendering.


function PasswordResetConfirm({ params }) {

    const [message, setMessage] = useContext(MessageContext);

    const full_params = params.location.pathname.split('/');
    const uid = full_params[2];
    const token = full_params[3];

    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const data = {
        'new_password1': pass1,
        'new_password2': pass2,
        'uid': uid,
        'token': token,
    }

    const [success, setSuccess] = useState(false);

    const displayErrors = (e) => {
        setMessage([]);
        for (const [key, value] of Object.entries(e)) {
            let val = [`${key}: ${value}`];
            setMessage(prev => [...prev, val]);
        }
    }

    const submitPasswordReset = e => {
        e.preventDefault();

        axios.post(`${baseBackendUrl}/users/password/reset/confirm/`, data)
        .then(res => {
            console.log(res.data);
            setSuccess(true);

        }).catch(err => {
            console.log(err);
            displayErrors(err.response.data);
        });
        
    }

    return (
        <>
            {success ?
            <p>password reset!</p>
            :
            <Form onSubmit={submitPasswordReset}>
                <FormControl type='password' placeholder='Enter new password' className='mr-sm-2' value={pass1} onChange={e => setPass1(e.target.value)} />
                <FormControl type='password' placeholder='Re-enter password' className='mr-sm-2' value={pass2} onChange={e => setPass2(e.target.value)} />
                <Button type='submit'>Reset</Button>
            </Form>
            }
        </>
    )
}

export default PasswordResetConfirm;