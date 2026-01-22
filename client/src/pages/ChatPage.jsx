import React, { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import { SocketClient } from "../components/SocketClient";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
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
        flexDirection: "column",
      }}
    >
      {user && <SocketClient />}

      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}

        {user && (
          <div style={{ flex: 1 }}>
            <Chatbox
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatpage;
