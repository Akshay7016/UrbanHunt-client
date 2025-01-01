import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { useAuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SERVER_URL));
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      socket.emit('newUser', currentUser.id);
    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);