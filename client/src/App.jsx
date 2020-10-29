import React, { useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import UserContext from './context/UserContext';
import Join from './pages/Join/Join';
import Chat from './pages/Chat/Chat';

const App = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [socket, setSocket] = useState({});
  const [showModal, setShowModal] = useState(false);

  return (
    <UserContext.Provider value={{
      name, setName, room, setRoom, socket, setSocket, showModal, setShowModal
    }}
    >
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
