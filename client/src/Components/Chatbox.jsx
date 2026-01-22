import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { getSocket } from "../components/SocketClient";
import bgImage from "../assets/bgImage.svg";

const Chatbox = () => {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedChat) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/message/${selectedChat._id}`
        );
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat || !user) return;

    const socket = getSocket();
    socket.emit("join chat", selectedChat._id);

    const onMessageReceived = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message recieved", onMessageReceived);

    return () => {
      socket.off("message recieved", onMessageReceived);
    };
  }, [selectedChat, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const socket = getSocket();

    const newMessage = {
      sender: {
        _id: user._id,
        name: user.name,
      },
      content: text,
      chat: selectedChat,
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("new message", newMessage);
    setText("");
  };

  if (!selectedChat) {
    return (
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Open a chat to start talking</p>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 12, background: "#1f2937", color: "#fff" }}>
        <strong>
          {selectedChat.users?.find(u => u._id !== user._id)?.name || "Chat"}
        </strong>
      </div>

      <div
        style={{
          flex: 1,
          padding: 12,
          overflowY: "auto",
          background: `url(${bgImage}) center / cover no-repeat`,
        }}
      >
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((m, i) => {
            const isMine = (m.sender?._id || m.sender) === user._id;
            return (
              <div
                key={m._id || i}
                style={{
                  textAlign: isMine ? "right" : "left",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: 16,
                    background: isMine
                      ? "rgba(147,197,253,0.85)"
                      : "rgba(229,231,235,0.9)",
                  }}
                >
                  {m.content}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", padding: 12, borderTop: "1px solid #e5e7eb" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ marginLeft: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
