const { json } = require("body-parser");
const UserModel = require("../model/User"); // Interact with model or entity.

const UserController = {
  // Get Mapping to get all users.
  getAllUsers: (req, res) => {
    UserModel.getAllUsers((err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      } else {
        res.json(result);
      }
    });
  },

  // Get Mapping to get a user by id.
  getUserById: (req, res) => {
    const { id } = req.params;

    UserModel.getUserById(id, (err, result) => {
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
    const usersData = req.body;
    const { name, email, password } = usersData;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" }); // Handle missing data
    }

    UserModel.createUser(usersData, (err, result) => {
      if (err) {
        console.error("Error Adding user!", err);
        return res.status(500).json({ error: "Internal Server Error!" });
      }
      res.status(201).json({ message: "User Added Successfully...." });
    });
  },

  // Put Mapping to update user details.
  updateUser: (req, res) => {
    const { id } = req.params;
    const usersData = req.body;

    UserModel.updateUser(id, usersData, (err, result) => {
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
};

module.exports = UserController;
