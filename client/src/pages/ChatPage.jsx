import React, { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, loading } = ChatState();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDEBAR */}
      {user && (
        <div style={{ width: "320px", flexShrink: 0 }}>
          <MyChats fetchAgain={fetchAgain} />
        </div>
      )}

      {/* MAIN CHAT AREA */}
      {user && (
        <div style={{ flex: 1 }}>
          <Chatbox />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
