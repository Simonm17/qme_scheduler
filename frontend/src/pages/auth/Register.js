import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { baseBackendUrl } from '../../urls';
import { MessageContext } from '../../MessageContext';


function Register() {

    const [message, setMessage] = useContext(MessageContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [party, setParty] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [sent, setSent] = useState(false);

    const displayErrors = (e) => {
        setMessage([]);
        for (const [key, value] of Object.entries(e)) {
            let val = [`${key}: ${value}`];
            setMessage(prev => [...prev, val]);
        }
    }

    const handleRegisterForm = e => {
        e.preventDefault();

        const registerData = {
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password1': password1,
            'password2': password2,
            'party': party,
            'is_requesting_admin': isAdmin,
        }

        axios.post(`${baseBackendUrl}/users/registration/`, registerData)
        .then(res => {
            console.log(res.data);
            setMessage([]);
            setSent(true);
        })
        .catch(err => {
            // add try/except for undefined property 'data'
            displayErrors(err.response.data);
        });
    }

    return (
        <>
        {sent? 
            <p>An email has been sent to your email address. Please check your inbox.</p>
            :
            <>
            <Form inline onSubmit={handleRegisterForm}>
                <FormControl type='text' placeholder='first name' value={firstName} onChange={e => setFirstName(e.target.value)} />
                <FormControl type='text' placeholder='last name' value={lastName} onChange={e => setLastName(e.target.value)} />
                <FormControl type='email' placeholder='new email' value={email} onChange={e => setEmail(e.target.value)} />
                <FormControl type='password' placeholder='password' value={password1} onChange={e => setPassword1(e.target.value)} />
                <FormControl type='password' placeholder='re-enter password' value={password2} onChange={e => setPassword2(e.target.value)} />

                <Form.Control as="select" custom value={party} onChange={e => setParty(e.target.value)}>
                    <option value=''>Choose..</option>
                    <option value='AA'>Applicant</option>
                    <option value='DA'>Defendant</option>
                </Form.Control>

                <Form.Check type='checkbox' label="I am my firm's admin." onChange={e => setIsAdmin(!isAdmin)}/>

                <Button type="submit" variant='outline-primary'>Register</Button>
            </Form>
            </>
        }
        </>
    )
}

export default Register;