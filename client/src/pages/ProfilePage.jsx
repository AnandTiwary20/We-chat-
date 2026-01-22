import React from "react";
import { ChatState } from "../Context/ChatProvider";

function ProfilePage() {
  const { user } = ChatState();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {user.name}
          </h1>

          <p className="text-gray-600 mb-6">{user.email}</p>

          <div className="space-y-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Account Information
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="text-gray-800">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Settings
              </h3>

              <div className="space-y-2 text-sm">
                <button className="w-full text-left text-gray-700 hover:text-blue-600 transition duration-200">
                  Edit Profile
                </button>

                <button className="w-full text-left text-gray-700 hover:text-blue-600 transition duration-200">
                  Privacy Settings
                </button>

                <button className="w-full text-left text-red-600 hover:text-red-700 transition duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
