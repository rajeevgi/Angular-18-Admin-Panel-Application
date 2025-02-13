const UserModel = require("../model/User"); // Interact with model or entity.

const UserController = { 
  // Get Mapping to get all users.(Only For Super Admin and Admin)
  getAllUsers: (req, res) => {
    if (!req.session.user || (req.session.user.role !== "superadmin" && req.session.user.role !== "admin")) {
      return res.status(403).json({ message : "Access Denied!" });
    }

    UserModel.getAllUsers((err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      } 
      res.json(result);
    });
  },

  // Get Mapping to get a user by id.
  getUserById: (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    if (req.session.user.role === "user" && req.session.user.id !== userId) {
      return res.status(403).json({ message: "Access Denied!" });
    }

    UserModel.getUserById(userId, (err, result) => {
      if (err) {
        console.error("Error fetching user by id:", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.json(result[0]);
    });
  },

  // Post Mapping to add users.
  addUser: (req, res) => {
    if (!req.session.user || (req.session.user.role !== "superadmin" && req.session.user.role !== "admin")) {
      return res.status(403).json({ message: "Access Denied!" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    UserModel.createUser({ name, email, password }, (err) => {
      if (err) {
        console.error("Error Adding user!", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      }
      res.status(201).json({ message: "User Added Successfully." });
    });
  },

  // Put Mapping to update user details.
  updateUser: (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    if (req.session.user.role === "user" && req.session.user.id !== userId) {
      return res.status(403).json({ message: "Access Denied!" });
    }

    UserModel.updateUser(userId, req.body, (err, result) => {
      if (err) {
        console.error("Error Updating user!", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.json({ message: "User Updated Successfully." });
    });
  },

  // Delete Mapping to remove user from table.
  deleteUser: (req, res) => {
    const { id } = req.params;
    if (!req.session.user || (req.session.user.role !== "superadmin" && req.session.user.role !== "admin")) {
      return res.status(403).json({ message: "Access Denied!" });
    }

    UserModel.deleteUser(id, (err, result) => {
      if (err) {
        console.error("Error Deleting user!", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.json({ message: "User Deleted Successfully." });
    });
  },

  // Get Profile for logged-In User
  getMyProfile: (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const userId = req.session.user.id;
    UserModel.getUserById(userId, (err, result) => {
      if (err) {
        console.error("Error fetching profile:", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      }
      res.json(result[0]);
    });
  },
};

module.exports = UserController;
