import react, { useContext, useEffect } from 'react';
import { MessageContext } from '../MessageContext';

const Message = () => {

    const [message, setMessage] = useContext(MessageContext);

    useEffect(() => {
        console.log('refreshing message state');
    }, [message]);

    const clearMsg = () => {
        setMessage([]);
    };

    const messages = message.map((msg) => 
        <li>{msg}</li>
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