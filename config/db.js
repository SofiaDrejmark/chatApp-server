const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.messsage);
    throw error;
  }

  const userStatement = `
  CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      username TEXT NOT NULL
  )`;

  const roomStatement = `
  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room TEXT UNIQUE NOT NULL
  )`; 

  const messageStatement = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    room TEXT,
    username TEXT,
    time TEXT
    )`;

  db.run(userStatement, (error) => {
    if (error) console.error(error.message);
  });
  db.run(roomStatement, (error) => {
    if (error) console.error(error.message);
  });
  db.run(messageStatement, (error) => {
    if (error) console.error(error.message);
  });

});
module.exports = db;