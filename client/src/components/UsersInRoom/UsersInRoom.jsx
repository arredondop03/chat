import React from 'react';
import Proptypes from 'prop-types';

import './UsersInRoom.css';

const UsersInRoom = ({ usersInRoom }) => (
  <div className="users-container">
    <div className="users-header-container">
      <h3 className="users-header">Users in chat</h3>
    </div>
    <div className="users-list">
      {usersInRoom && usersInRoom.map((user) => <p className="user-in-chat" key={user.id}>{user.name}</p>)}
    </div>
  </div>
);

export default UsersInRoom;

UsersInRoom.propTypes = {
  usersInRoom: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
    room: Proptypes.string.isRequired,
  })),
};

UsersInRoom.defaultProps = {
  usersInRoom: [],
};
