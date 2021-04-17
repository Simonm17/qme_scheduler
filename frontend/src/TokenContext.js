import { useState, createContext } from 'react';


export const TokenContext = createContext();

export const TokenProvider = props => {

    const [token, setToken] = useState('');

    return (
        <TokenContext.Provider value={[token, setToken]}>
            {props.children}
        </TokenContext.Provider>
    );
}