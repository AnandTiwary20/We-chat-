import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import bgImage from "../assets/bgImage.svg";

const Chatbox = () => {
  const { user, selectedChat, socket } = ChatState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Fetch messages when chat changes
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/message/${selectedChat._id}`
        );
        setMessages(Array.isArray(data) ? data : []);
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // Socket listeners
  useEffect(() => {
    if (!socket || !selectedChat) return;

    // Join chat room
    socket.emit("join chat", selectedChat._id);

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message recieved", handleMessage);

    return () => {
      socket.off("message recieved", handleMessage);
    };
  }, [socket, selectedChat]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !socket || !selectedChat) return;

    const tempMessage = {
      _id: Date.now(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      content: text,
      chat: selectedChat,
      createdAt: new Date().toISOString(),
    };

    // Add message to UI immediately (sender won't receive echo)
    setMessages((prev) => [...prev, tempMessage]);

    // Send to server
    socket.emit("new message", {
      sender: tempMessage.sender,
      content: tempMessage.content,
      chat: selectedChat,
    });

    setText("");
  };

  if (!selectedChat) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: 12, background: "#1f2937", color: "white" }}>
        <strong>
          {selectedChat.users?.find((u) => u._id !== user._id)?.name}
        </strong>
      </div>

      <div
        style={{
          flex: 1,
          padding: 12,
          overflowY: "auto",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
      >
        {loading ? (
          "Loading..."
        ) : (
          messages.map((m, i) => {
            const isMine = m.sender?._id === user._id;
            return (
              <div key={i} style={{ textAlign: isMine ? "right" : "left" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: 16,
                    marginBottom: 6,
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

      <div style={{ display: "flex", padding: 12 }}>
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
