const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const models = require("./models/models");
const fs = require("fs");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  socket.on("ready", async () => {
    const rooms = await models.getRooms();
    socket.emit("get_rooms", rooms);
  });

  socket.on("join_room", async (room) => {
    const existingRooms = await models.getRooms();
    const index = existingRooms.findIndex(
      (existingRoom) => existingRoom.room === room
    );
    if (index === -1) {
      await models.addRoom(room);
      const rooms = await models.getRooms();
      socket.emit("get_rooms", rooms);
    }
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

socket.on("save_username", (username) => {
  models.addUser(username);
});

  socket.on("send_message", (data) => {
    if (data.message === "") {
      console.log("dont send empty messages");
    } else {

      socket.to(data.room).emit("receive_message", data);
      models.addMessage(data);
      console.log(data)
    }
  });

  socket.on("delete_room", async (room) => {
    models.deleteRoom(room);
    models.deleteMessages(room);
    const messages = await models.getMessages();
    const rooms = await models.getRooms();
    socket.emit("get_rooms", rooms);
    socket.emit("get_messeges", messages);
  });

  socket.on("leave_room", () => {
    console.log("Left room");
    socket.leave(socket.rooms);
  });

  socket.on("disconnect", () => {
   
    console.log(`User with ID: ${socket.id} disconnected`);
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
