import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { baseBackendUrl } from '../../urls';


function GoogleConnect({ params }) {

    // used for redirecting back to homepage after successful login
    let history = useHistory();

    // extract code from /users/google/<code>/
    const accessCode = params.location.pathname.slice(14, -1);

    const data = {
        'code': accessCode
    }

    const submitCode = async () => {
        await axios.post(`${baseBackendUrl}/users/google/connect/`, data)
        .then(res => {
            let token = localStorage.setItem('token', res.data.key);
            history.push('/');
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        submitCode();
    }, []);

    return (
        <p>{accessCode}</p>
        
    )
}

export default GoogleConnect;