const User = require("../model/User");
const Admin = require("../model/Admin");

const RegisterController = {
  // User Registration
  registerUser: (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    User.registerUser(name, email, password, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ message: "User registered successfully!", user });
    });
  },

  // Admin/Super Admin Registration
  registerAdmin: (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (role !== "admin" && role !== "superadmin") {
      return res.status(400).json({ message: "Invalid role!" });
    }

    Admin.registerAdmin(username, password, role, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ message: "Admin registered successfully!"});
    });
  },
};

module.exports = RegisterController;
