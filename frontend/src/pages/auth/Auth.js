import React from 'react';
import Login from '../../components/auth/Login';
import Nav from '../../components/Nav';
import { Link } from 'react-router-dom';


function Auth() {
    return (
        <>
            <Nav />
            <Login />
            <Link to='/register'>Register </Link>
        </>
    )
}

export default Auth;