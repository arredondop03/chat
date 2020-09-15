/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import UsersInRoom from '../../components/UsersInRoom/UsersInRoom';
import UserContext from '../../context/UserContext';

import './Chat.css';

// TODO: /* eslint-disable react/jsx-one-expression-per-line */
// // TODO: pageobject for testing, beforeEach, afterEach

const Chat = ({ history }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [usersInRoom, setUsersInRoom] = useState({});
  const [isShowingUsers, setIsShowingUsers] = useState(false);

  const context = useContext(UserContext);
  const { socket, room, name } = context;

  useEffect(() => {
    // if (socket.connected === true) {
      console.log(socket)
      socket.on('message', (messageFromServer) => setMessages((stateMessages) => [...stateMessages, messageFromServer]));
      socket.on('roomData', (usersFromServer) => setUsersInRoom(usersFromServer));
    // } else {
      // console.log('ede')
      // history.push('/')
      // history.goBack();
    // }

    return () => {
      if (socket.connected) {
        socket.emit('disconnect');
        socket.off();
      }
    };
  }, [history, socket]);


  useEffect(() => {
console.log(messages)
  }, messages)

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="chat-shell">
      <div className={`chat-users-container ${isShowingUsers ? 'show-users' : ''}`}>
        <UsersInRoom usersInRoom={usersInRoom.users} />
      </div>
      <div
        className={isShowingUsers ? 'overlay' : ''}
        onClick={() => setIsShowingUsers(!isShowingUsers)}
        onKeyPress={() => setIsShowingUsers(!isShowingUsers)}
        role="button"
        tabIndex="0"
        aria-label="overlay, press to hide users"
      />
      <div className="chat-container">
        <div className="info-bar">
          <h3 className="info-bar-header">Room {room}</h3>
          <div>
            <button className="button users-button" onClick={() => setIsShowingUsers(!isShowingUsers)} type="button">
              { isShowingUsers ? 'Hide users' : 'Show users'}
            </button>
            <Link to="/" className="button info-button">Leave chat</Link>
          </div>
        </div>
        <Messages messages={messages} currentUser={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;

Chat.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
