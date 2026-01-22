import React, { useState } from "react";

function HomePage() {
  const [messages] = useState([
    { id: 1, text: "Welcome to the chat!" }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          WeChat – Chat Room
        </h1>

        <div className="border rounded-lg h-64 p-2 mb-3 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2 text-sm text-gray-800">
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-2 py-1"
          />
          <button className="bg-blue-500 text-white px-4 rounded-lg">
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
