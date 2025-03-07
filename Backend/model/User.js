const db = require("../config/database"); // Database connection

// User entity
const User = {
  // Login User
  loginUser: (email, password, callback) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  
    db.query(sql, [email, password], (err, result) => {
      if (err) return callback(err, null); // Pass error to callback
      if (result.length === 0) return callback(new Error("Invalid Credentials!"), null);

      callback(null, result[0]); // Return user data
    });
  },
  
  // Register User
  registerUser: (name, email, password,callback) => {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    
    db.query(query, [name, email, password], (err, results) => {
      if (err) return callback(err, null);
      callback(null, { id: results.insertId,email });
    });
  },

  // Get all Users
  getAllUsers: (callback) => {
    db.query("SELECT * FROM users", callback);
  },

  // Get User by Id
  getUserById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },

  // Register User (Prevent duplicate emails)
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

  // Update User
  updateUser: (id, usersData, callback) => {
    const { name, email, password } = usersData;
    const query = "Update users set name = ? , email = ? , password = ? where id = ?";
    db.query(query, [name, email, password, id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  // Delete user.
  deleteUser: (id, callback) => {
    db.query("delete from users where id = ?", [id], callback);
  },
};

module.exports = User;
