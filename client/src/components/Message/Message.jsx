import React from 'react';
import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ message: { text, sender }, currentUser }) => {
  const trimmedCurrentUser = currentUser.trim().toLowerCase();

  let messageClassName;
  switch (sender) {
    case 'Random Fact Teller':
      messageClassName = 'message-fact-teller';
      break;
    case trimmedCurrentUser:
      messageClassName = 'message-current-user';
      break;
    default:
      messageClassName = 'message-admin';
      break;
  }

  return (
    <div className={`message-container ${messageClassName}`}>
      <div className={`message-box ${messageClassName}`}>
        <p className={`message ${messageClassName}`}>{text}</p>
      </div>
      <p className={`sender-name ${messageClassName}`}>{sender}</p>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
};
