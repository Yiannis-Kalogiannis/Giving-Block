import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import useUserStore from "../store/useUserStore";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userId } = useUserStore();

  useEffect(() => {
    if (userId) {
      console.log("Initializing socket connection for userId:", userId);

      // Clean up any existing socket instance before creating a new one
      if (socket) {
        console.log("Closing previous socket instance...");
        socket.close();
      }

      const newSocket = io("http://localhost:8080", {
        query: { userId }, // Pass userId as a query param
      });

      // Log socket connection
      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      // Handle online users list
      newSocket.on("getOnlineUsers", (users) => {
        console.log("Online users received from server:", users);
        setOnlineUsers(users);
      });

      // Handle connection errors
      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
      });

      // Set socket instance
      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        console.log("Cleaning up socket...");
        newSocket.close();
      };
    } else {
      // Handle case where userId is missing
      console.warn("No userId provided, closing socket if active...");
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
