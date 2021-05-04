import React from 'react';
import { render } from 'react-dom';


function App() {
    return (
        <>
            <div>
                <h1>React</h1>
            </div>
        </>
    )
}

export default App;

const container = document.getElementById("app");
render(<App />, container);