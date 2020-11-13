import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

import './Join.css';

import { UserContext } from '../../context/UserContext';
import youthIlustration from '../../assets/friends.svg';
import shape from '../../assets/shape-1.svg';
import Modal from '../../components/Modal/Modal';

const Join = ({ history }) => {
  let socket;
  const ENDPOINT = process.env.NODE_ENV === 'production' ? window.location.origin : 'localhost:5000';

  const [formName, setFormUsername] = React.useState('');
  const [formRoom, setFormRoom] = React.useState('');
  const [error, setError] = React.useState('');

  const {
    showModal,
    setShowModal,
    setSocket,
    setName,
    setRoom,
  } = React.useContext(UserContext);

  const join = (event) => {
    if (!formName || !formRoom) {
      event.preventDefault();
      return;
    }

    socket = io(ENDPOINT, {
      reconnection: false,
    });

    socket.emit('join', { name: formName, room: formRoom }, function(error) { 
      if (error) {
      setError(error);
      return;
      }
    });

    socket.on('connect_error', () => {
      setShowModal(true);
    });

    socket.on('error', () => {
      setShowModal(true);
    });

    socket.on('login_successful', () => {
      setSocket(socket);
      setName(formName);
      setRoom(formRoom);
      history.push('/chat');
    })
  };

  return (
    <div className="join-container">
      <img src={shape} className="shape shape-right" alt="decorative shape" />
      <img src={shape} className="shape shape-left" alt="decorative shape" />
      <div className="join-right-container">
        <img alt="people texting each other" src={youthIlustration} />
      </div>
      <div className="join-left-container">
        <h1 className="join-header">Start chatting!</h1>
        {error && <p>{error}</p>}
        <input autoComplete="off" placeholder="Username" id="username" className="join-input" type="text" onChange={(event) => setFormUsername(event.target.value)} value={formName} />
        <input autoComplete="off" placeholder="Room" id="room" className="join-input" type="text" onChange={(event) => setFormRoom(event.target.value)}  value={formRoom} />
        <button type="button" className="join-button" onClick={(event) => join(event)}>Sign in</button>
      </div>
      {showModal && <div className="join-overlay" />}
      {showModal && <Modal />}
    </div>
  );
};

export default Join;

Join.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
