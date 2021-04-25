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

function App() {
  return (
    <TokenProvider>
    <MessageProvider>
    <BrowserRouter>
    
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route
          path="/confirm-email/:code"
          render={
            locationProps => 
            <ConfirmEmail
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
