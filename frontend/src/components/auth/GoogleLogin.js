import React, { useState } from 'react';
import { baseBackendUrl } from '../../urls';
import { Button } from 'react-bootstrap';


function GoogleLogin() {

    const googleLogin = `${baseBackendUrl}/users/auth/login/`;

    return (
        <Button href={googleLogin}>
            Login with Google
        </Button>
    )
}

export default GoogleLogin;