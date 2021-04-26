import React from 'react';
import Login from './Login';
import Nav from '../../components/Nav';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import Register from './Register';
import ConfirmEmail from './ConfirmEmail';

function Auth() {

    let { path, url } = useRouteMatch();

    return (
        <>
            <Nav />
            <Switch>
                <Route path={`${path}/login`}>
                    <Login />
                </Route>
                <Route path={`${path}/register`}>
                    <Register />
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
            </Switch>
        </>
    )
}

export default Auth;