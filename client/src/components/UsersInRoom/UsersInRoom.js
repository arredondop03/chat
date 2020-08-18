import React from 'react';

import './UsersInRoom.css';

const UsersInRoom = ({usersInRoom}) => {
    

    return (
        <div>
           {usersInRoom && usersInRoom.map((user)=> <p key={user.id}>{user.name}</p>)}
        </div>
    )
};

export default UsersInRoom;



