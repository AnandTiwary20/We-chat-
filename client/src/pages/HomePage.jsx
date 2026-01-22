import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

function HomePage() {
  const navigate = useNavigate();
  const { user, loading, logout } = ChatState();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom right, #dbeafe, #ffffff, #faf5ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              border: "3px solid #2563eb",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
          <p style={{ marginTop: 16, color: "#4b5563" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #dbeafe, #ffffff, #faf5ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div style={{ maxWidth: 1024, width: "100%" }}>
        <div
          style={{
            background: "white",
            borderRadius: 16,
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              color: "white",
              padding: 32,
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 8 }}>
              Welcome to WeChat, {user.name}!
            </h1>
            <p style={{ color: "#dbeafe" }}>
              Choose how you want to continue
            </p>
          </div>

          {/* Options */}
          <div style={{ padding: 32 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {/* Chat */}
              <div
                onClick={() => navigate("/chat")}
                className="chat-option"
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                <div className="chat-icon simple">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "white" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  Simple Chat
                </h3>
                <p style={{ color: "#4b5563", fontSize: 14 }}>
                  Basic chat room interface
                </p>
                <div
                  style={{
                    marginTop: 16,
                    color: "#2563eb",
                    fontWeight: 500,
                  }}
                >
                  Enter Chat →
                </div>
              </div>

              {/* Profile */}
              <div
                onClick={() => navigate("/profile")}
                className="chat-option"
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                <div
                  className="chat-icon profile"
                  style={{ background: "#9333ea" }}
                >
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "white" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  My Profile
                </h3>
                <p style={{ color: "#4b5563", fontSize: 14 }}>
                  View and edit your profile
                </p>
                <div
                  style={{
                    marginTop: 16,
                    color: "#9333ea",
                    fontWeight: 500,
                  }}
                >
                  View Profile →
                </div>
              </div>
            </div>

            {/* Logout */}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button
                onClick={logout}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
