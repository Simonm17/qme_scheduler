import React, { useState, useEffect } from 'react';
import { baseBackendUrl } from '../../urls';
import axios from 'axios';


function ConfirmEmail({ params }) {

    // slices and returns code for backend code submission
    const paramString = params.location.pathname.split('/');
    const code = paramString[3]

    const data = {
        'key': code
    }

    const [verified, setVerified] = useState(false);

    const submitEmailCode = () => {
        axios.post(`${baseBackendUrl}/users/registration/verify-email/`, data)
        .then(res => {
            setVerified(true);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        submitEmailCode();
    }, [])

    return (
        <>
            {verified?
            <h1>Your email has been verified!</h1>
            :
            <>
            <p>{code}</p>
            </>
            }
        </>
    )
}

export default ConfirmEmail;