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


function App() {
  return (
    <TokenProvider>
    <MessageProvider>
    <BrowserRouter>
    
      <Switch>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
      
    </BrowserRouter>
    </MessageProvider>
    </TokenProvider>
  );
}

export default App;
