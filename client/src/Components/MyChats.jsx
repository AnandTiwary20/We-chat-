import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const getChatName = (chat) => {
    if (!chat || !user) return "Chat";

    if (!chat.isGroupChat) {
      const other = chat.users?.find((u) => u._id !== user._id);
      return other?.name || "User";
    }

    return chat.chatName || "Group Chat";
  };

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chat?userId=${user._id}`
        );
        setChats(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("Failed to load chats");
        setChats([]);
      }
    };

    fetchChats();
  }, [fetchAgain, user]);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      setSearchResult([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/users?search=${value}`
      );
      setSearchResult(res.data || []);
    } catch {
      setSearchResult([]);
    }
  };

  const createChat = async (userId) => {
    if (userId === user._id) {
      alert("You cannot chat with yourself");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        currentUserId: user._id,
        userId,
      });

      setChats((prev) => [res.data, ...prev]);
      setSelectedChat(res.data);
      setShowSearch(false);
      setSearch("");
      setSearchResult([]);
    } catch {
      console.log("Could not create chat");
    }
  };

  return (
    <div
      style={{
        width: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e5e7eb",
        background: "#fff",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          background: "linear-gradient(to right, #9333ea, #2563eb)",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>My Chats</span>
          <button
            onClick={() => setShowSearch((p) => !p)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 4,
              padding: "4px 8px",
              color: "#fff",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {showSearch ? "Cancel" : "New Chat"}
          </button>
        </div>
      </div>

      {showSearch && (
        <div style={{ padding: 12, borderBottom: "1px solid #e5e7eb" }}>
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search users..."
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #d1d5db",
              borderRadius: 4,
            }}
          />

          {searchResult.map((u) => (
            <div
              key={u._id}
              onClick={() => createChat(u._id)}
              style={{
                padding: 8,
                marginTop: 4,
                cursor: "pointer",
                borderRadius: 4,
                background: "#f9fafb",
                fontSize: 14,
              }}
            >
              {u.name}
            </div>
          ))}
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {chats.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              textAlign: "center",
            }}
          >
            <div>
              <div>No chats yet</div>
              <div style={{ fontSize: 12 }}>
                Click “New Chat” to start
              </div>
            </div>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                background:
                  selectedChat?._id === chat._id
                    ? "#f3f4f6"
                    : "#fff",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {getChatName(chat)}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {chat.latestMessage?.content || "No messages yet"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyChats;
