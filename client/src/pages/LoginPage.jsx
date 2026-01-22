 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <input
          type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
      />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
