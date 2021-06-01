import axios from 'axios';

import React, { useState, useContext, useEffect } from 'react';
import { MessageContext } from '../../MessageContext'
import { TokenContext } from '../../TokenContext'
import { baseBackendUrl } from '../../urls';
import { Redirect } from 'react-router-dom';

// TODO: add form validation errors

const Profile = () => {

    axios.defaults.withCredentials = true;

    const [message, setMessage] = useContext(MessageContext);
    const [isAuthenticated, setIsAuthenticated] = useContext(TokenContext);
    const [email, setEmail] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass1, setNewPass1] = useState('');
    const [newPass2, setNewPass2] = useState('');
    const userUrl = `${baseBackendUrl}/users/user/`
    const passUrl = `${baseBackendUrl}/users/password/change/`

    const getProfile = () => {
        axios.get(userUrl).then(res => {
            console.log(res.data);
            setEmail(res.data.email);
            setFirst(res.data.first_name);
            setLast(res.data.last_name);
        }).catch(err => {
            console.log(err.response.data);
            return <Redirect to='/users/login' />
        });
    }

    const submitUserForm = (e) =>  {
        e.preventDefault();
        let data = {
            'first_name': first,
            'last_name': last
        }
        axios.put(userUrl, data).then(res=> {
            setMessage(['Information saved successfully!']);
        }).catch(err => {
            console.log(err.response.data);
        });
    }

    const submitPasswordForm = (e) => {
        setMessage([]);

        let data = {
            'old_password': oldPass,
            'new_password1': newPass1,
            'new_password2': newPass2,
        }
        if (newPass1 === newPass2) {
            axios.post(
                passUrl,
                data
            ).then(res => {
                setMessage([res.data]);
            }).catch(err => {
                console.log(err.response.data);
            });
        } else {
            setMessage(["New password fields do not match."]);
        }

    }

    useEffect(async () => {
        await getProfile();
    },[message]);

    return (
        <>
        {isAuthenticated ?
            <div>
                <ul>
                    <li>Personal Information</li>
                    <li>Password</li>
                </ul>
                <div>
                    <p>{email}</p>
                    <form onSubmit={submitUserForm}>
                        <input type='text' value={first} onChange={e => setFirst(e.target.value)} />
                        <input type='text' value={last} onChange={e => setLast(e.target.value)} />
                        <input type='submit' value='Save' />
                    </form>
                </div>
                <div>
                    <p>Change password</p>
                    <form onSubmit={submitPasswordForm}>
                        <input type='password' placeholder='Old password' onChange={e => setOldPass(e.target.value)} required />
                        <input type='password' placeholder='New Password' onChange={e => setNewPass1(e.target.value)} required />
                        <input type='password' placeholder='Re-enter New Password' onChange={e => setNewPass2(e.target.value)} required />
                        <input type='submit' value='Change Password' />
                    </form>
                </div>
            </div>
        :
            ''
        }
        </>
    )
}

export default Profile;