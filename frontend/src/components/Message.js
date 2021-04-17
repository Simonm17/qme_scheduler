import react, { useContext, useEffect } from 'react';
import { MessageContext } from '../MessageContext';

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
        <>
        {message.length > 0?
            <ul>
            {messages}
            <span onClick={clearMsg}>x</span>
            </ul>
            :
            ''
        }
        </>
    )
}

export default Message;