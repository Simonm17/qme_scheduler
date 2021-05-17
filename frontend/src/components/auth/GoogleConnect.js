import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { baseBackendUrl } from '../../urls';
import { TokenContext} from '../../TokenContext';


function GoogleConnect({ params }) {

    const [isAuthenticated, setIsAuthenticated] = useContext(TokenContext);

    // used for redirecting back to homepage after successful login
    let history = useHistory();

    // extract code from /users/google/<code>/
    const accessCode = params.location.pathname.slice(14, -1);

    const data = {
        'code': accessCode
    }

    const submitCode = async() => {
        await axios.post(`${baseBackendUrl}/users/google/connect/`, data, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            setIsAuthenticated(true);
            if (!res.data.user.party || res.data.user.party === '') {
                console.log('user has no party!');
                return history.push('/users/select');
            }
            return history.push('/dashboard');
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        submitCode();
    }, []);

    return (
        <></>
    )
}

export default GoogleConnect;