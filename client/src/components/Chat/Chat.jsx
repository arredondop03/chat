import React, { useState, useEffect, useContext } from 'react';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import UsersInRoom from '../UsersInRoom/UsersInRoom';
import { UserContext } from '../../context/UserContext';


import './Chat.css';

//  TODO: deploy 1:45:00
//  TODO: check emojis
//  TODO: Show users in chat
//  Check quotation marks
// TODO: /* eslint-disable react/jsx-one-expression-per-line */
// querystring remove
//TODO: chat => same name
//TODO:refresh

const Chat = ({history}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [usersInRoom, setUsersInRoom] = useState({});

  const context = useContext(UserContext);

  useEffect(() => {
        context.socket.on('message', (messageFromServer) => setMessages((stateMessages) => [...stateMessages, messageFromServer]));
        context.socket.on('roomData', (usersFromServer) => setUsersInRoom(usersFromServer));

    return () => {
      context.socket.emit('disconnect');
      context.socket.off();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      context.socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="chat-shell">
      <div className="chat-users-container">
        <UsersInRoom usersInRoom={usersInRoom.users} />
      </div>
      <div className="chat-container">
        <InfoBar room={context.room} />
        <Messages messages={messages} name={context.name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
