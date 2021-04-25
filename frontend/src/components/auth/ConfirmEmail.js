import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { baseBackendUrl } from '../../urls';
import axios from 'axios';


function ConfirmEmail({ params }) {

    // slices and returns code for backend code submission
    const emailCode = params.location.pathname.slice(15, -1);
    const data = {
        'key': emailCode
    }

    const [verified, setVerified] = useState(false);

    const submitEmailCode = () => {
        axios.post(`${baseBackendUrl}/users/registration/verify-email/`, data)
        .then(res=> {
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
            emailCode}
        </>
    )
}

export default ConfirmEmail;