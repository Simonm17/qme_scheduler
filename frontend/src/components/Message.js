import react, { useContext, useEffect } from 'react';
import { MessageContext } from '../MessageContext';
import styled from 'styled-components';


const Message = () => {

    const [message, setMessage] = useContext(MessageContext);

    const clearMsg = () => {
        setMessage([]);
    };

    useEffect(() => {
    }, [message, setMessage]);

    const messages = message.map((msg) => 
        <li key={message.indexOf(msg)}>{msg}</li>
    );

    return (
        <Div>
        {message.length > 0?
            <div className="alert alert-info d-flex" role="alert">
                <ul>
                {messages}
                </ul>
                <span onClick={clearMsg}>x</span>
            </div>
            :
            ''
        }
        </Div>
    )
}

const Div = styled.div`
    span {
        margin-left: 25px;
        cursor: pointer;
    }
`;

export default Message;