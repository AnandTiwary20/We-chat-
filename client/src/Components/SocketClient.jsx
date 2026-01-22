import { useEffect } from "react";
import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";

const ENDPOINT = "http://localhost:5000";
let socket;

const SocketClient = () => {
  const { user } = ChatState();

  useEffect(() => {
    if (!user?._id) return;

    socket = io(ENDPOINT, {
      transports: ["websocket"],
    });

    socket.emit("setup", user);

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [user]);

  return null;
};

export const getSocket = () => socket;
export default SocketClient;
