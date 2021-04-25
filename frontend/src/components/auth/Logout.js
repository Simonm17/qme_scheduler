import React, { useState, useContext } from 'react';
import { TokenContext } from '../../TokenContext';
import { MessageContext } from '../../MessageContext';
import { Nav } from 'react-bootstrap';

function Logout() {
    const [token, setToken] = useContext(TokenContext);
    const [message, setMessage] = useContext(MessageContext);
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        setToken('');
        setMessage(['Successfully logged out!']);
    }
    return (
        <>
            <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
        </>
    )
}

export default Logout;