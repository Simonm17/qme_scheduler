import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/appointments'>
                        New Appointment
                    </Link>
                </li>
                <li>Search Appointments</li>
            </ul>
            <ul>
                <li>Search Contacts</li>
                <li>New Contact (Person)</li>
                <li>New Contact (Company)</li>
            </ul>
            <ul>
                <li>Create tasks</li>
                <li>View tasks</li>
            </ul>
        </nav>
    );
}

export default Nav;