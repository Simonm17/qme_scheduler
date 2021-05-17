import React from 'react';


function Dashboard() {

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <div>
                    <h5>Past Due Tasks</h5>
                    <div>
                        <p>Jose Martinez</p>
                        <p>John Candaman</p>
                        <p>Laura Hope</p>
                    </div>
                </div>
                <div>
                    <h5>Things to do today</h5>
                    <ul>
                        <li>Water plant</li>
                        <li>Feed pet</li>
                        <li>Make money</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;