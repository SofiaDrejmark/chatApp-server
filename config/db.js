/*const sqlite3 = require("sqlite3").verbose();
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
*/

const { Client } = require("pg");

  const userStatement = `
  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, 
      username TEXT NOT NULL
  )`;

  const roomStatement = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room TEXT UNIQUE
  )`; 

  const messageStatement = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    room TEXT,
    username TEXT,
    time TEXT
    )`;

const db = new Client({
  ssl: {
    rejectUnauthorized: false
  },
  connectionString: process.env.DATABASE_URL
})

db.connect();

  db.query(userStatement, (error) => {
    if (error) console.error(error.message);
  });
  db.query(roomStatement, (error) => {
    if (error) console.error(error.message);
  });
  db.query(messageStatement, (error) => {
    if (error) console.error(error.message);
  });


module.exports = db;