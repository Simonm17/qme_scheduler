import React, { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../../MessageContext';
import { TokenContext } from '../../TokenContext';
import Message from '../../components/Message';
import axios from 'axios';
import { baseBackendUrl } from '../../urls';
import { useHistory } from 'react-router-dom';
import DashNav from '../../components/dashboard/Nav';


function Dashboard() {

    let history = useHistory();

    const [message, setMessage] = useContext(MessageContext);
    // const [token, setToken] = useState(localStorage.getItem('token'));
    const [isValidated, setIsValidated] = useState(false);

    const data = {
        'token': localStorage.getItem('access_token')
    }

    function validateToken() {
        axios.post(`${baseBackendUrl}/users/dj-rest-auth/token/verify/`, data)
        .then(res => {
            setIsValidated(true);
        })
        .catch(err =>{
            setMessage(['Token verification failed on Dashboard component.']);
            history.push('/');
        });
    }

    useEffect(() => {
        // validateToken();
    }, [])

    return (
        <>
            <Message />
            <DashNav />
            <p>dashboard!</p>
        </>
    );
}

export default Dashboard;