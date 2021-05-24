import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Login from '../pages/auth/Login';
import Logout from './auth/Logout';
import { TokenContext } from '../TokenContext';
import { MessageContext } from '../MessageContext';
import axios from 'axios';
import { baseBackendUrl } from '../urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faHome, faCommentsDollar, faPhone, faUser, faSignInAlt, faUserPlus, faSignOutAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';


const HomeNav = () => {
    const [isAuthenticated, setIsAuthenticated] = useContext(TokenContext);
    const [message, setMessage] = useContext(MessageContext);

    useEffect(() => {

    }, [isAuthenticated, message]);

    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand><Link to='/'><FontAwesomeIcon icon={faNotesMedical} /> QME</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-around'>
                <Nav className="d-flex justify-content-between">
                    <div className="d-flex">
                        <Nav.Link href="#home"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                        <Nav.Link href="#pricing"><FontAwesomeIcon icon={faCommentsDollar} /> Pricing</Nav.Link>
                        <Nav.Link href="#contact"><FontAwesomeIcon icon={faPhone} /> Contact</Nav.Link>
                    </div>
                    <div className='d-flex'>
                        {isAuthenticated?
                            <>
                                <Nav.Link><Link to='/dashboard'><FontAwesomeIcon icon={faClipboardList} /> Dashboard</Link></Nav.Link>
                                <Nav.Link><Link to='/users/profile'><FontAwesomeIcon icon={faUser} /> User</Link></Nav.Link>
                                <Logout setIsAuthenticated={setIsAuthenticated} />
                            </>
                            :
                            <>
                                <Nav.Link><Link to='/users/login'><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></Nav.Link>
                                <Nav.Link><Link to={{
                                    pathname: `/users/register`
                                }}><FontAwesomeIcon icon={faUserPlus} /> Register</Link></Nav.Link>
                            </>
                        }
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HomeNav;