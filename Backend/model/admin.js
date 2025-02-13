const db = require("../config/database");

// Admin Entity
const admin = {

  // Login admin/superadmin
  loginAdmin: (username, password, callback) => {
    db.query(
      "SELECT * FROM admins WHERE username = ? AND password = ?",
      [username, password],
      (err, result) => {
        if (err) return callback(err, null);
        if (result.length === 0) {
          return callback({ message: "Invalid credentials!" }, null);
        }
        return callback(null, result[0]); // Return admin details
      }
    );
  },

  // Get All admins (only for Super Admin)
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
          return callback(null, result.length > 0 ? result[0] : null);
        }
      }
    );
  },

  // Create Admin (Only Super Admin can add Admins)
  createAdmin: (adminData, callback) => {
    const { username, password, role } = adminData;

    // Ensure only valid roles are allowed
    if(!["superadmin", "admin"].includes(role)){
      return callback(new Error("Invalid role!"), null);
    }

    db.query(
      "Insert into admins (username, password, role) values (?, ?, ?)",
      [username, password, role],
      callback
    );
  },

  // Update Admin (Only Super Admin Can Update Admins)
  updateAdmin: (id, adminData, callback) => {
    const { username, password, role } = adminData;

    if(!["superadmin","admin"].includes(role)){
      return callback(new Error("Invalid role!"), null);
    }

    const values = [username, password, role, id];
    db.query(
      "Update admins set username = ?, password = ?, role = ? where id = ?",
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

  // Delete Admin (Only Super Admin Can Delete Admins)
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
