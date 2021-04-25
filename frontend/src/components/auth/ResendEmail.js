import React, { useContext } from 'react';
import axios from 'axios';
import { baseBackendUrl } from '../../urls';
import { MessageContext } from '../../MessageContext';


function ResendEmail({ email }) {

    const [message, setMessage] = useContext(MessageContext);

    const data = {
        'email': email
    }

    const resendEmail = () => {
        axios.post(`${baseBackendUrl}/users/send-email-verification/`, data)
        .then(res => {
            setMessage(['Confirmation email sent! Please check your inbox.']);
        })
        .catch(err => {
            console.log(err);
            setMessage(['An error occured. Please try again later.']);
        })
    }

    return (
        <p>
            <span onClick={resendEmail} style={{textDecoration: 'underline', cursor: 'pointer'}}>
                click here
            </span> 
             to resend confirmation email.
        </p>
    )
}

export default ResendEmail;