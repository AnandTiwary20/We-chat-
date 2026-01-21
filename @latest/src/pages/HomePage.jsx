import React from 'react'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to WeChat</h1>
        <p className="text-lg text-gray-600 mb-8">Connect with friends and family</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default HomePage