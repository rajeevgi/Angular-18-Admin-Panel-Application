const db = require("../config/database");

// Admin Entity
const admin = {
  // Login Admin or SuperAdmin
  loginAdmin: (username, password, role, callback) => {
    console.log("Admin Login Query:", username, password, role); // Debugging

    const query = "SELECT * FROM admins WHERE username = ? AND password = ? AND role = ?";
    
    db.query(query, [username, password, role], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(new Error("Invalid credentials"), null);
      callback(null, results[0]); // Return the found admin
    });
  },

  // Register Admin or SuperAdmin
  registerAdmin: (username, password, role, callback) => {
    const query = "INSERT INTO admins (username, password, role) VALUES (?, ?, ?)";
    
    db.query(query, [username, password, role], (err, results) => {
      if (err) return callback(err, null);
      callback(null, { id: results.insertId, username, role });
    });
  },

  // Get All admins (only for Super Admin)
  getAllAdmins: (callback) => {
    db.query("Select * from admins", callback);
  },

  // Get Admins by ID (Only Super Admin can get Admins by Id)
  getAdminsById: (id, callback) => {
    db.query("Select * from admins where id = ?", [id], callback);
  },

  // Create Admin (Only Super Admin can add Admins)
  createAdmin: (adminData, callback) => {
    const { username, password } = adminData;

    db.query(
      "Insert into admins (username, password) values (?, ?)",
      [username, password],
      callback
    );
  },

  // Update Admin (Only Super Admin Can Update Admins)
  updateAdmin: (id, adminData, callback) => {
    const { username, password, role } = adminData;
    db.query(
      "Update admins set username = ?, password = ?, role = ? where id = ?",
      [username, password, role, id],
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
