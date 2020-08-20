import React, {createContext} from 'react'

export const UserContext = createContext({
    name: '',
    setName: () => {},
    room: '',
    setRoom: () => {},
    socket: {},
    setSocket: () => {},

});
