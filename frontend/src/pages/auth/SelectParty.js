import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { baseBackendUrl } from '../../urls';
import { MessageContext } from '../../MessageContext';
import { useHistory } from 'react-router-dom';

function SelectParty() {

    let history = useHistory();

    const [message, setMessage] = useContext(MessageContext);
    const [party, setParty] = useState('');

    const [email, setEmail] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');

    const access_token = localStorage.getItem('access_token');

    function configAxios(method, access_token, data=null) {
        var config = {
            method: method,
            url: `${baseBackendUrl}/users/user/`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            data: data
        }
        return config;
    }

    const getUser = () => {
        axios(configAxios('get', access_token))
        .then(res => {
            if (res.data.user.party) {
                setMessage(['User already has a party! Returned to dashboard.']);
                setParty(res.data.user.party);
                // history.push('/dashboard');
            } else {
                setEmail(res.data.user.email);
                setFirst(res.data.user.first_name);
                setLast(res.data.user.last_name);
            }
        })
        .catch(err => {
            console.log(err);
            console.log(err.response);
            // history.push('/');
        })
    }

    useEffect(() => {
        getUser();
    },[party]);

    const handleForm = e => {
        e.preventDefault();

        const data = {
            'email': email,
            'first_name': first,
            'last_name': last
        }
        axios(configAxios('put', access_token, data))
        .then(res => {
            console.log('success!');
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <Form>
            <label>
                <input type="radio" name="party" onClick={() => setParty("AA")} value="AA" checked={party === 'AA' ? true : false}/>
                Applicant
            </label>
            <label>
                <input type="radio" name="party" onClick={() => setParty("DA")} value="DA"  checked={party === 'DA' ? true : false}/>
                Defense
            </label>
            <input type="submit" onClick={handleForm} value="Confirm" />
            <p>party: {party}</p>
        </Form>
    )

}

const Form = styled.form`

`;

export default SelectParty;