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
        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link to='/'>QME</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <div className="d-flex justify-content-around">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </div>
                        {isAuthenticated?
                            <>
                                <Nav.Link><Link to='/dashboard'>Dashboard</Link></Nav.Link>
                                <Logout setIsAuthenticated={setIsAuthenticated} />
                            </>
                            :
                            <>  
                                <Link to='/users/login'>Login</Link>
                                <Link to={{
                                    pathname: `/users/register`
                                }}>Register</Link>
                            </>
                        }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HomeNav;