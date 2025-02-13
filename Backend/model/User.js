const db = require("../config/database"); // Database connection

// User entity
const User = {
  // Get all users
  getAllUsers: (callback) => {
    db.query("SELECT * FROM users", callback);
  },

  // Get user by ID
  getUserById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },

  // Register user (Prevent duplicate emails)
  createUser: (usersData, callback) => {
    const { name, email, password } = usersData;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) return callback(err, null);
      if (result.length > 0) {
        return callback({ message: "Email already exists!" }, null);
      }

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        callback
      );
    });
  },

  // Login user
  loginUser: (email, password, callback) => {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) return callback(err, null);
        if (result.length === 0) {
          return callback({ message: "Invalid credentials!" }, null);
        }
        return callback(null, result[0]); // Return user details
      }
    );
  },
};

module.exports = User;
