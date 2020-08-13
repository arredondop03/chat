import React from 'react';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;
    let trimmedName = name.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justify-end">
                    <p>{trimmedName}</p>
                    <div className="messageBox">
            <p>text: {text}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justify-start">
                    <div className="messageBox">
                        <p> text:{text}</p>
                    </div>
                    <p>{user}</p>
                </div>
            )
    )
};

export default Message;



