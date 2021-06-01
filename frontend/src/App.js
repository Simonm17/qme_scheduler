import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './pages/index/Home';
import { TokenProvider } from './TokenContext';
import { MessageProvider } from './MessageContext';
import Auth from './pages/auth/Auth';
import PasswordResetConfirm from './pages/auth/PasswordResetConfirm';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/auth/Profile';


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
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>

    </BrowserRouter>
    </MessageProvider>
    </TokenProvider>
  );
}

export default App;
