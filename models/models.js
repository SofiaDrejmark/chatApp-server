const db = require("../config/db");
const res = require("express/lib/response");

// Get all Rooms
function getRooms() {
  const sql = `SELECT * FROM rooms`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rooms) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve(rooms);
    });
  });
}

// Get all Users
function getUsers() {
  const sql = `SELECT * FROM users`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, users) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve(users);
    });
  });
}

// Get one Room
function getRoom() {
  const sql = `SELECT room FROM rooms`;

  return new Promise((resolve, reject) => {
    db.get(sql, (error, room) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(201);
      resolve(room);
    });
  });
}
// Add Rooms
function addRoom(room) {
  const sql = `INSERT INTO rooms (room) VALUES (?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [room], (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve(room);
    });
  });
}
// Add User
function addUser(username) {
  const sql = `INSERT INTO users (username) VALUES (?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [username], (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(200);
      resolve(username);
    });
  });
}

// Delete Room
function deleteRoom(room) {
  const sql = `DELETE FROM rooms WHERE room = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, room, (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      console.log("Room deleted");
      res.status(204);
      resolve(room);
    });
  });
}

//Messages
function getMessages(room) {
  const sql = `SELECT * FROM messages WHERE room = ?`;

  return new Promise((resolve, reject) => {
    db.all(sql, room, (error, rows) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(201);
      resolve(rows);
    });
  });
}

function deleteMessages(room) {
  const sql = `DELETE FROM messages WHERE room =?`;

  return new Promise((resolve, reject) => {
    db.get(sql, room, (error) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(201);
      resolve();
    });
  });
}

function addMessage(data) {
  const sql = `INSERT INTO messages (message, room, username, time) VALUES (?,?,?,?)`;

  return new Promise((resolve, reject) => {
    db.run(sql, [ data.message, data.room, data.username, data.time], (error, rows) => {
      if (error) {
        console.error(error.message);
        res.status(400);
        reject(error);
      }
      res.status(201);
      resolve(rows);
    });
  });
}

module.exports = {
  getRooms,
  getRoom,
  addRoom,
  deleteRoom,
  getMessages,
  deleteMessages,
  addMessage,
  getUsers,
  addUser,
};