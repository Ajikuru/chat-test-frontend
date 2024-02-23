import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

//const socket = io('http://localhost:3001');
const socket = io('https://chat-test-backend.vercel.app:3001');

function App() {
    const [messages, setMessages] = useState<Array<string>>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('chat', (msg : string) => {
            setMessages([...messages, msg]);
        });

        return () => {
            socket.off();
        };
    }, [messages,message]);

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('chat', message);
        setMessage('');
        console.log(`is messaging: ${message}`)
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;
