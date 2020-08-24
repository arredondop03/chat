import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from 'prop-types';

import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages, currentUser }) => (
  <ScrollToBottom className="messages-container">
    {messages.map((message) => (
      <div key={message.id}>
        <Message message={message} currentUser={currentUser} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  })).isRequired,
  currentUser: PropTypes.string.isRequired,
};
