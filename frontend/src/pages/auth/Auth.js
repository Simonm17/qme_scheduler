import React from 'react';
import Login from '../../components/auth/Login';
import Register from './Register';
import { Link } from 'react-router-dom';


function Auth() {
    return (
        <>
            <Login />
            <Link to='/register'>Register </Link>
        </>
    )
}

export default Auth;