import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import UsersInRoom from '../../components/UsersInRoom/UsersInRoom';
import UserContext from '../../context/UserContext';

import './Chat.css';

const Chat = ({ history }) => {
  const [messages, setMessages] = React.useState([]);
  const [usersInRoom, setUsersInRoom] = useState({});
  const [isShowingUsers, setIsShowingUsers] = useState(false);

  const context = React.useContext(UserContext);
  const { socket, room, name } = context;

  React.useEffect(() => {
    if (socket.connected !== undefined) {
      socket.on('message', (messageFromServer) => setMessages((stateMessages) => [...stateMessages, messageFromServer]));
      socket.on('roomData', (usersFromServer) => setUsersInRoom(usersFromServer));
    } else {
      history.push('/');
    }
    return () => {
      if (socket.connected) {
        socket.emit('disconnect');
        socket.off();
      }
    };
  }, [history, socket]);

  return (
    <div className="chat-shell">
      <div className={`chat-users-container${isShowingUsers ? ' show-users' : ''}`}>
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
        <Input />
      </div>
    </div>
  );
};

export default Chat;

Chat.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
