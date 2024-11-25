const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("user/database.sql", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database file.");
    }
});

async function getUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE LOWER(username) = ?';
    const normalizedUsername = String(username).toLowerCase();
  
    return new Promise((resolve, reject) => {
      db.get(query, [normalizedUsername], (err, row) => {
        if (err) {
          console.error("Database query error:", err.message);
          reject(new Error("Database query failed"));
        } else {
          resolve(row);
        }
      });
    });
  }

async function createAccount(username, password, data) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (username, password, data) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
            db.run(query, [username, hashedPassword, data], function (err) {
                if (err) reject(err);
                resolve({ id: this.lastID, username, data });
            });
        });
    } catch (err) {
        throw err;
    }
}

module.exports = { db, createAccount, getUserByUsername };