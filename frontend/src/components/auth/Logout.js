import React, { useEffect, useContext } from 'react';
import { TokenContext } from '../../TokenContext';
import { MessageContext } from '../../MessageContext';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { baseBackendUrl } from '../../urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Logout() {

    const [message, setMessage] = useContext(MessageContext);
    const [isAuthenticated, setIsAuthenticated] = useContext(TokenContext);

    const handleLogoutClick = () => {
        axios.post(`${baseBackendUrl}/users/dj-rest-auth/logout/`, {data:''}, {withCredentials:true})
        .then(res => {
            setMessage(['Successfully logged out!']);
            setIsAuthenticated(false);
        })
        .catch(err => {
            console.log(err);
            setMessage(['An error occured.']);
        });
    }

    return (
        <Nav.Link onClick={handleLogoutClick}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>
    )
}

export default Logout;