import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import './Join.css';

import UserContext from '../../context/UserContext';
import youthIlustration from '../../assets/friends.svg';
import shape from '../../assets/shape-1.svg';

// <a href='https://www.freepik.com/vectors/social-media'>Social media vector created by stories - www.freepik.com</a>
// abstract <a href='https://www.freepik.com/vectors/banner'>Banner vector created by freepik - www.freepik.com</a>

const Join = () => {
  let socket;
  const ENDPOINT = 'localhost:5000';

  const [formName, setFormUsername] = React.useState('');
  const [formRoom, setFormRoom] = React.useState('');

  const context = React.useContext(UserContext);

  const join = (event) => {
    if (!formName || !formRoom) {
      event.preventDefault();
      return;
    }
    socket = io(ENDPOINT);
    socket.emit('join', { name: formName, room: formRoom }, () => { });
    context.setSocket(socket);
    context.setName(formName);
    context.setRoom(formRoom);
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
        <input placeholder="Username" id="username" className="join-input" type="text" onChange={(event) => setFormUsername(event.target.value)} value={formName} />
        <input placeholder="Room" id="room" className="join-input" type="text" onChange={(event) => setFormRoom(event.target.value)} />
        <Link className="join-button" onClick={(event) => join(event)} to="/chat">Sign in</Link>
      </div>
    </div>
  );
};

export default Join;
