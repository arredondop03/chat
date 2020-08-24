import React from 'react';
import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ message: { text, sender }, currentUser }) => {
  let isSentByCurrentUser = false;
  const trimmedCurrentUser = currentUser.trim().toLowerCase();
  if (sender === trimmedCurrentUser) {
    isSentByCurrentUser = true;
  }

  return (
    <div className={`message-container ${isSentByCurrentUser && 'message-user-container'}`}>
      <div className="message-box">
        <p>{text}</p>
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
