import React, { useState, useEffect, useContext } from 'react';
import InfoBar from '../../components/InfoBar/InfoBar';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import UsersInRoom from '../../components/UsersInRoom/UsersInRoom';
import { UserContext } from '../../context/UserContext';


import './Chat.css';

//  TODO: deploy 1:45:00
// TODO: /* eslint-disable react/jsx-one-expression-per-line */


const Chat = ({history}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [usersInRoom, setUsersInRoom] = useState({});

  const context = useContext(UserContext);

  useEffect (() => {
    if(context.socket.hasOwnProperty('connected')) {
      context.socket.on('message', (messageFromServer) => setMessages((stateMessages) => [...stateMessages, messageFromServer]));
      context.socket.on('roomData', (usersFromServer) => setUsersInRoom(usersFromServer));
    } else {
      history.goBack();
    };

    return () => {
      if(context.socket.connected) {
        context.socket.emit('disconnect');
        context.socket.off();
      }
    };
  },[context.socket]);

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
