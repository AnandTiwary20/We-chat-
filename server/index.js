const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const User = require("./models/User");
const Chat = require("./models/chat");
const Message = require("./models/Message");
const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);

app.get("/api/chat", async (req, res) => {
  try {
    const { userId } = req.query;
    const chats = await Chat.find(userId ? { users: userId } : {})
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { currentUserId, userId } = req.body;

    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [currentUserId, userId], $size: 2 },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat) return res.json(chat);

    const newChat = await Chat.create({
      isGroupChat: false,
      users: [currentUserId, userId],
    });

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );

    res.json(fullChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/message/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    if (!userData || !userData._id) return;
    socket.join(userData._id.toString());
    socket.emit("connected");
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId.toString());
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", async (payload) => {
    try {
      const message = await Message.create({
        sender: payload.sender._id,
        content: payload.content,
        chatId: payload.chat._id,
      });

      await Chat.findByIdAndUpdate(payload.chat._id, {
        latestMessage: message._id,
      });

      const chat = await Chat.findById(payload.chat._id).populate(
        "users",
        "_id"
      );

      chat.users.forEach((u) => {
        if (u._id.toString() === payload.sender._id.toString()) return;

        io.to(u._id.toString()).emit("message recieved", {
          _id: message._id,
          sender: payload.sender,
          content: payload.content,
          chat: payload.chat,
          createdAt: message.createdAt,
        });
      });
    } catch (err) {
      console.log("Error handling message:", err);
    }
  });
});
