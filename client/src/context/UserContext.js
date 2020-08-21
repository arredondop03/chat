import { createContext } from 'react';

export default createContext({
  name: '',
  setName: () => {},
  room: '',
  setRoom: () => {},
  socket: {},
  setSocket: () => {},
});
