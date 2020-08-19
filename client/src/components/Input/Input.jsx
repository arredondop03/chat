import React from 'react';
import PropTypes from 'prop-types';

import sendIcon from '../../assets/send.svg';
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="input-container">
    <input
      type="text"
      value={message}
      className="input-area"
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
      placeholder="Type a message..."
    />
    <button type="button" className="input-send-button" onClick={(event) => sendMessage(event)}><img className="input-send-image" src={sendIcon} alt="send-button" /></button>
  </form>
);

export default Input;

Input.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};
