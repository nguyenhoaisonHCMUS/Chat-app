const { createServer } = require('node:http');
const { Server } = require('socket.io');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app =express();
app.use(cors({
	origin: "http://localhost:5173",
  	methods: ["GET", "POST","PUT", "DELETE"]
}));
app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

const server = createServer(app);
const io = new Server(server);

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected: ", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

module.exports = { app, io, server, getReceiverSocketId };