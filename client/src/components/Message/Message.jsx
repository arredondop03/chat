import React from 'react';
import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ message: { text, sender }, currentUser }) => {
  const trimmedCurrentUser = currentUser.trim().toLowerCase();
  let isSentByCurrentUser = sender === trimmedCurrentUser;

  return (
    <div className={`message-container ${isSentByCurrentUser && 'message-user-container'}`}>
      <div className="message-box">
        <p className="message">{text}</p>
      </div>
      <p className={isSentByCurrentUser ? 'message-user-name' : 'message-friend-name'}>{isSentByCurrentUser ? trimmedCurrentUser : sender}</p>
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
