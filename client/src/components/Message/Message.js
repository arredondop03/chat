import React from 'react';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;
    let trimmedName = name.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        <div className={"message-container " + (isSentByCurrentUser && "message-user-container")}>
            <div className="message-box">
                <p>{text}</p>
            </div>
            <p className={isSentByCurrentUser && "message-user-name"}>{isSentByCurrentUser ? trimmedName : user}</p>
        </div>
    )
};

export default Message;



