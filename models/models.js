const db = require("../config/db");

async function getRooms () {
  const sql = `SELECT * FROM rooms`;
  const result = await db.query(sql)
  return result.rows;
}

// Get all Users



async function getUsers() {
  const sql = `SELECT * FROM users`;
    const result = await db.query(sql) 
    return result.rows; 
  
}

// Get one Room
async function getRoom() {
  const sql = `SELECT room FROM rooms`;
    const result = await db.query(sql)
   return result.rows;
}
// Add Rooms
async function addRoom(room) {
  const sql = `INSERT INTO rooms (room) VALUES ($1)`;
    const result = await db.query(sql, [room])
   return result.rows;
}
// Add User
async function addUser(username) {
  const sql = `INSERT INTO users (username) VALUES ($1)`;
    const result = await db.query(sql, [username])
    return result.rows;
}

// Delete Room
async function deleteRoom(room) {
  const sql = `DELETE FROM rooms WHERE room = $1`;
    const result = await db.query(sql, [room])
      return result.rows;
}

//Messages
async function getMessages(room) {
  const sql = `SELECT * FROM messages WHERE room = $1`;
   const result = await db.query(sql, [room])
   return result.rows;
}

async function deleteMessages(room) {
  const sql = `DELETE FROM messages WHERE room =$1`;
    const result = await db.query(sql, [room])
    return result.rows;
}

async function addMessage(data) {
  const sql = `INSERT INTO messages (message, room, username, time) VALUES ($1,$2,$3,$4)`;
    const result = await db.query(sql, [ data.message, data.room, data.username, data.time])
    return result.rows;
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

