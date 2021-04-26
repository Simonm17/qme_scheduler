import React, { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './pages/index/Home';
import Message from './components/Message';
import { TokenProvider } from './TokenContext';
import { MessageProvider } from './MessageContext';
import Register from './pages/auth/Register';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import Auth from './pages/auth/Auth';
import PasswordResetConfirm from './pages/auth/PasswordResetConfirm';


function App() {
  return (
    <TokenProvider>
    <MessageProvider>
    <BrowserRouter>
    
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/users'>
          <Auth />
        </Route>
        <Route
          path='/reset/:uid?/:code?'
          render={
              locationProps => 
              <PasswordResetConfirm
              params={locationProps}
              />
          }
        />
      </Switch>
      
    </BrowserRouter>
    </MessageProvider>
    </TokenProvider>
  );
}

export default App;
