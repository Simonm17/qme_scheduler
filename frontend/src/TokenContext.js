import { useState, createContext, useEffect } from 'react';
import { baseBackendUrl } from './urls';
import axios from 'axios';

export const TokenContext = createContext();

export const TokenProvider = props => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function refreshToken() {
        axios.post(
            `${baseBackendUrl}/users/token/refresh/`,
            {data: ''}, {withCredentials: true}
            )
            .then(res => {
                console.log('Successful resposne from Tokenprovider.useffect')
                setIsAuthenticated(true);
            })
            .catch(err => {
                
                if (err.response.status !== 401) {
                    console.log(err.response.data);
                }
                if (isAuthenticated) {
                    setIsAuthenticated(false);
                }
            })
    }

    useEffect(() => {
        refreshToken();
    }, [isAuthenticated]);

    return (
        <TokenContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
            {props.children}
        </TokenContext.Provider>
    );
}
