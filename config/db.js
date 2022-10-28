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
