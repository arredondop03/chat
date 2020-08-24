/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import UsersInRoom from '../../components/UsersInRoom/UsersInRoom';
import UserContext from '../../context/UserContext';

import './Chat.css';

//  TODO: deploy 1:45:00
// TODO: /* eslint-disable react/jsx-one-expression-per-line */
// TODO: pageobject for testing, beforeEach, afterEach

const Chat = ({ history }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [usersInRoom, setUsersInRoom] = useState({});

  const context = useContext(UserContext);
  const { socket, room, name } = context;

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(socket, 'connected')) {
      socket.on('message', (messageFromServer) => setMessages((stateMessages) => [...stateMessages, messageFromServer]));
      socket.on('roomData', (usersFromServer) => setUsersInRoom(usersFromServer));
    } else {
      history.goBack();
    }

    return () => {
      if (socket.connected) {
        socket.emit('disconnect');
        socket.off();
      }
    };
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="chat-shell">
      <div className="chat-users-container">
        <UsersInRoom usersInRoom={usersInRoom.users} />
      </div>
      <div className="chat-container">
        <div className="info-bar">
          <h3>Room {room}</h3>
          <Link to="/" className="info-button">Leave chat</Link>
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

// import React from 'react';
// import { shallow } from 'enzyme';
// import InfoBar from './InfoBar';

// describe('InfoBar', () => {
//   it('renders without crashing', () => {
//     const wrapper = shallow(<InfoBar room="1" />);
//     expect(wrapper).toHaveLength(1);
//   });

//   it('displays header correctly', () => {
//     const possibleCases = [
//       'Paola\'s room',
//       '1234567890',
//       'abcdefghijklmnopqrstuvwxyzñ',
//       // eslint-disable-next-line no-template-curly-in-string
//       '${hey}',
//       '!@#$%^&*()_+',
//       '<script>alert("hey");</script>',
//       '    ',
//     ];
//     possibleCases.forEach((possibleCase) => {
//       const wrapper = shallow(<InfoBar room={possibleCase} />);
//       const header = wrapper.find('h3');
//       expect(header.text()).toEqual(`Room ${possibleCase}`);
//     });
//   });

//   // it('should redirect to home page when "Leave chat" button was clicked', () => {
//   //   const wrapper = shallow(<InfoBar room="1" />);
//   //   console.log(window.location)
//   //   // wrapper.find('Link').simulate('click');
//   // });
// });