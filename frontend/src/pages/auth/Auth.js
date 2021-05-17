import React from 'react';
import Login from './Login';
import Nav from '../../components/Nav';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import Register from './Register';
import ConfirmEmail from './ConfirmEmail';
import PasswordReset from './PasswordReset';
import PasswordResetConfirm from './PasswordResetConfirm';
import Message from '../../components/Message';
import GoogleConnect from '../../components/auth/GoogleConnect';
import SelectParty from './SelectParty';


function Auth() {

    let { path, url } = useRouteMatch();

    return (
        <>
            <Nav />
            <Message />
            <Switch>
                <Route path={`${path}/login`}>
                    <Login />
                </Route>
                <Route path={`${path}/register`}>
                    <Register />
                </Route>
                <Route path={`${path}/password/reset`}>
                    <PasswordReset />
                </Route>
                <Route path={`${path}/select`}>
                    <SelectParty />
                </Route>
                <Route
                    path={`${path}/confirm-email/:code`}
                    render={
                        locationProps => 
                        <ConfirmEmail
                        params={locationProps}
                        />
                    }
                />
                <Route
                    path={`${path}/google/:code`}
                    render={
                        locationProps =>
                        <GoogleConnect
                            params={locationProps}
                        />
                    }
                />
            </Switch>
        </>
    )
}

export default Auth;