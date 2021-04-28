import React, { useEffect, useContext } from 'react';
import { TokenContext } from '../../TokenContext';
import { MessageContext } from '../../MessageContext';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { baseBackendUrl } from '../../urls';


function Logout({ setIsAuthenticated }) {
    const [message, setMessage] = useContext(MessageContext);

    const handleLogoutClick = () => {
        axios.post(`${baseBackendUrl}/users/logout/`)
        .then(res => {
            setMessage(['Successfully logged out!']);
        })
        .catch(err => {
            console.log(err);
            setMessage(['An error occured.']);
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    }

    return (
        <>
            <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
        </>
    )
}

export default Logout;