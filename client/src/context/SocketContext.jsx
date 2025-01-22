import { createContext, useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import useUserStore from '../store/useUserStore';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userId } = useUserStore();
  const socketRef = useRef(null); // Use ref to persist socket instance across renders

  useEffect(() => {
    if (userId) {
      console.log('Initializing socket connection for userId:', userId);

      // Clean up any existing socket instance before creating a new one
      if (socketRef.current) {
        console.log('Closing previous socket instance...');
        socketRef.current.close();
      }

      const newSocket = io('http://localhost:8080', {
        query: { userId }, // Pass userId as a query param
      });

      // Log socket connection
      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
      });

      // Handle online users list
      newSocket.on('getOnlineUsers', (users) => {
        console.log('Online users received from server:', users);
        setOnlineUsers(users);
      });

      // Handle connection errors
      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
      });

      // Set socket instance using ref
      socketRef.current = newSocket;

      // Cleanup on unmount
      return () => {
        console.log('Cleaning up socket...');
        socketRef.current?.close();
        socketRef.current = null;
      };
    } else {
      // Handle case where userId is missing
      console.warn('No userId provided, closing socket if active...');
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
