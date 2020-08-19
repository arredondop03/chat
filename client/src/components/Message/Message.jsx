import React from 'react';
import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div className={`message-container ${isSentByCurrentUser && 'message-user-container'}`}>
      <div className="message-box">
        <p>{text}</p>
      </div>
      <p className={isSentByCurrentUser ? 'message-user-name' : 'message-friend-name'}>{isSentByCurrentUser ? trimmedName : user}</p>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};
