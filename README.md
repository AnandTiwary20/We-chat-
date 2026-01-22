Github Repository - https://github.com/AnandTiwary20/We-chat-


Real-Time Chat Application (MERN + Socket.IO)

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for live messaging.
Users can register, log in, search other users, start one-to-one chats, and send messages instantly.

The project focuses on real-time communication, authentication, and a clean user experience.

Features

User authentication (Register / Login)


JWT-based authorization

Real-time messaging using Socket.IO

One-to-one private chats

Search users by name or email

Chat history stored in MongoDB

Profile page with user details

Protected routes (only logged-in users can access chats)

Responsive and clean UI

🛠 Tech Stack
Frontend

React

React Router

Context API (global state management)

Axios

Tailwind CSS + inline styles

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT (Authentication)

bcryptjs (Password hashing)

Socket.IO (Real-time communication)

How to run the Application -


▶️ How to Run the Project
1️⃣ Clone the Repository
git clone <your-repo-url>
cd your-project-folder

2️⃣ Backend Setup
cd server
npm install

Create a .env file:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start backend server:
npm start

Backend will run on:

http://localhost:5000

3️⃣ Frontend Setup
cd client
npm install
npm run dev
Frontend will run on:

http://localhost:5173

Future Improvements
Group chats
Message read receipts
File & image sharing
Online / offline status
Better error handling
Mobile responsiveness improvements
