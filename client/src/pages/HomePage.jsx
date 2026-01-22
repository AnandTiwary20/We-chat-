import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

function HomePage() {
  const navigate = useNavigate();
  const { user, loading, logout } = ChatState();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #faf5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid #2563eb', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <p style={{ marginTop: '16px', color: '#4b5563' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #faf5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ maxWidth: '1024px', width: '100%' }}>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', color: 'white', padding: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome to WeChat, {user.name}!</h1>
              <p style={{ color: '#dbeafe' }}>Choose how you want to continue</p>
            </div>
          </div>

          {/* Options */}
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
             
              <div 
                onClick={() => navigate('/chat')}
                className="chat-option"
                style={{ textAlign: 'center' }}
              >
                <div className="chat-icon simple">
                  <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.003 9.003 0 00-9-9c0-1.464 0-2.846.625-3.975 1.495-1.495 1.495 0 002.846 1.495 3.975 3.975 0 009-9z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Simple Chat</h3>
                <p style={{ color: '#4b5563', fontSize: '14px' }}>Basic chat room interface</p>
                <div style={{ marginTop: '16px', color: '#2563eb', fontWeight: '500', fontSize: '14px' }}>
                  Enter Chat →
                </div>
              </div>

              <div 
                onClick={() => navigate('/profile')}
                className="chat-option"
                style={{ textAlign: 'center' }}
              >
                <div className="chat-icon profile" style={{ background: '#9333ea' }}>
                  <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>My Profile</h3>
                <p style={{ color: '#4b5563', fontSize: '14px' }}>View and edit your profile</p>
                <div style={{ marginTop: '16px', color: '#9333ea', fontWeight: '500', fontSize: '14px' }}>
                  View Profile →
                </div>
              </div>
              
            </div>

            {/* Logout Button */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button 
                onClick={logout}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Logout
              </button>
            </div>

            {/* Features */}
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Features</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon" style={{ background: '#10b981' }}>
                    <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L4 5L5 13m0 0l6-6m0 0l-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '500', color: '#1f2937' }}>Real-time Messaging</h4>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Instant message delivery</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon" style={{ background: '#2563eb' }}>
                    <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 00-4 4v12a4 4 0 004 4h4a4 4 0 004-4V8.354a4 4 0 00-4-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19h14" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '500', color: '#1f2937' }}>Secure & Private</h4>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>End-to-end encryption</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon" style={{ background: '#9333ea' }}>
                    <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '500', color: '#1f2937' }}>Multi-device</h4>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Chat anywhere</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon" style={{ background: '#f97316' }}>
                    <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 004.5 4.5v9a4.5 4.5 0 00-4.5 4.5h-9a4.5 4.5 0 00-4.5-4.5v-9a4.5 4.5 0 004.5-4.5h9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '500', color: '#1f2937' }}>Media Sharing</h4>
                    <p style={{ fontSize: '14px', color: '#4b5563' }}>Photos & files</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
