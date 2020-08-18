import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css'

//TODO: deploy 1:45:00
//TODO: check emojis
//TODO: Show users in chat
//TODO: create own normalize css



let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ENDPOINT = 'localhost:5000';

    

    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);
        socket.emit('join', {name, room}, () => {});
        socket.on('message', messageFrom => setMessages(messages => [ ...messages,messageFrom]));

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, []);

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="chat-container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    )
}

export default Chat;