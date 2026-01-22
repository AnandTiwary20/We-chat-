import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    newSocket.emit("setup", user);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user]);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setSelectedChat(null);
    setNotification([]);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        socket,
        loading,
        logout,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);
