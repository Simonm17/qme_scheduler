import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Login from '../pages/auth/Login';
import Logout from './auth/Logout';
import { TokenContext } from '../TokenContext';
import { MessageContext } from '../MessageContext';


const HomeNav = () => {
    const [token, setToken] = useContext(TokenContext);
    const [message, setMessage] = useContext(MessageContext);

    function checkToken() {
        setToken(localStorage.getItem('token'));
    }

    useEffect(() => {
        checkToken();
    }, [token]);

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
                        {token?
                            <>
                                <Nav.Link href="#home">Dashboard</Nav.Link>
                                <Logout />
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