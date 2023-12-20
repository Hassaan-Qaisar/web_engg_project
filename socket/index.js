// Import required modules
const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Load environment variables from a .env file
require("dotenv").config({
  path: "./.env",
});

// Use middleware
app.use(cors());
app.use(express.json());

// Simple route for testing purposes
app.get("/", (req, res) => {
  res.send("Hello world from socket server!");
});

// Array to store connected users
let users = [];

// Function to add a user to the users array
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Function to remove a user from the users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Function to get a user based on their userId
const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

// Function to create a message object
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// Socket.io event handling
io.on("connection", (socket) => {
  console.log(`a user is connected`);

  // Event to handle user addition
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Object to store messages
  const messages = {};

  // Event to handle sending messages
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });

    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    io.to(user?.socketId).emit("getMessage", message);
  });

  // Event to handle marking a message as seen
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );

      if (message) {
        message.seen = true;
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });

  // Event to update and get the last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessagesId,
    });
  });

  // Event to handle user disconnection
  socket.on("disconnect", () => {
    console.log(`a user disconnected!`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Start the server on the specified port or default to 4000
server.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on port ${process.env.PORT || 4000}`);
});
