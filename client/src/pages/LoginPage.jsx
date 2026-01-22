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

      console.log("Login response:", res.data);
      
      // Get user info with token
      const userRes = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        },
      });
      
      // Store both token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(userRes.data));
      
      window.location.href = "/homepage";
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '448px', border: '1px solid #f3f4f6' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: '#4b5563' }}>Sign in to your WeChat account</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', transition: 'all 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', transition: 'all 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          style={{ width: '100%', background: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', marginTop: '24px', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseOver={(e) => e.target.style.background = '#1e40af'}
          onMouseOut={(e) => e.target.style.background = '#2563eb'}
        >
          Sign In
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#4b5563' }}>
            Don't have an account?{" "}
            <span
              style={{ color: '#2563eb', fontWeight: '600', cursor: 'pointer' }}
              onClick={() => navigate("/")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
