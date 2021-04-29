import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Login from '../pages/auth/Login';
import Logout from './auth/Logout';
import { TokenContext } from '../TokenContext';
import { MessageContext } from '../MessageContext';
import axios from 'axios';
import { baseBackendUrl } from '../urls';


const HomeNav = () => {
    const [token, setToken] = useContext(TokenContext);
    const [message, setMessage] = useContext(MessageContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const checkToken = () => {

        const data = {
            'token': localStorage.getItem('access_token')
        }

        if (localStorage.getItem('access_token')) {
            axios.post(`${baseBackendUrl}/users/token/verify/`, data)
                .then(res => {
                    setIsAuthenticated(true);
                })
                .catch(err => {
                    setIsAuthenticated(false);
                    setMessage(['Token verification failed at Nav component.']);
                    console.log(err);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
            });
        }

    }

    useEffect(() => {
        checkToken();
    }, [message, setMessage, setIsAuthenticated]);

    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand><Link to='/'>QME</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-around'>
                <Nav className="d-flex justify-content-between">
                    <div className="d-flex">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </div>
                    <div className='d-flex'>
                        {isAuthenticated?
                            <>
                                <Nav.Link><Link to='/dashboard'>Dashboard</Link></Nav.Link>
                                <Nav.Link><Logout setIsAuthenticated={setIsAuthenticated} /></Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link><Link to='/users/login'>Login</Link></Nav.Link>
                                <Nav.Link><Link to={{
                                    pathname: `/users/register`
                                }}>Register</Link></Nav.Link>
                            </>
                        }
                    </div>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default HomeNav;