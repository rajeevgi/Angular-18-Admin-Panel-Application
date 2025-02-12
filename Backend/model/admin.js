const db = require("../config/database");

// Admin Entity
const admin = {
  // Get All admins
  getAllAdmins: (callback) => {
    db.query("Select * from admins", callback);
  },

  // Get Admins by ID
  getAdminsById: (id, callback) => {
    db.query("Select * from admins where id = ?", [id], callback);
  },

  // Find admin by username (for login)
  findAdminByUsername: (username, callback) => {
    db.query(
      "Select * from admins where username = ?",
      [username],
      (err, result) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },

  // Create Admin
  createAdmin: (adminData, callback) => {
    const { username, password } = adminData;

    db.query(
      "Insert into admins (username, password) values (?, ?)",
      [username, password],
      callback
    );
  },

  // Update Admin
  updateAdmin: (id, adminData, callback) => {
    const { username, password } = adminData;
    const values = [username, password, id];
    db.query(
      "Update admins set username = ?, password = ? where id = ?",
      values,
      (err, result) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  // Delete Admin
  deleteAdmin: (id, callback) => {
    db.query("Delete from admins where id = ?", [id], (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
};

module.exports = admin;
