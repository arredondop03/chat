import React from 'react';

import './UsersInRoom.css';

const UsersInRoom = ({ usersInRoom }) => {


    return (
        <div className="users-container">
            <h3 className="users-header">Users in chat</h3>
            <div className="users-list">
                {usersInRoom && usersInRoom.map((user) => <p className="user-in-chat" key={user.id}>{user.name}</p>)}
            </div>
        </div>
    )
};

export default UsersInRoom;



