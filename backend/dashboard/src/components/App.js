import React from 'react';
import { render } from 'react-dom';
import Nav from './Nav';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Dashboard from './Dashboard';
import Appointments from './Appointments';


function App() {
    return (
        // <BrowserRouter>
        //     <Nav />
        //     <Switch>
        //         <Route path="dashboard/appointments/">
        //             <Appointments />
        //         </Route>
        //         <Route path="/dashboard">
        //             <Dashboard />
        //         </Route>
        //     </Switch>
        // </BrowserRouter>
        <>
            <Dashboard />
        </>
    )
}

export default App;

const container = document.getElementById("app");
render(<App />, container);