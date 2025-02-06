const { json } = require("body-parser");
const UserModel = require("../model/User"); // Interact with model or entity.

const UserController = {
  // Get Mapping to get all users.
  getAllUsers: (req, res) => {
    UserModel.getAllUsers((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  // Get Mapping to get user by id.
  getUserById: (req, res) => {
    const { id } = req.params; // get user id first.

    UserModel.getUserById(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        return res.status(404).json({ message: "User not found!" });
      } else {
        res.json(results[0]);
      }
    });
  },

  // Post Mapping to add users.
  addUser: (req, res) => {
    const usersData = req.body;

    UserModel.createUser(usersData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res
          .status(201)
          .json({ message: "User Added Successfully...", id: result.insertId });
      }
    });
  },

  // Put Mapping to update user details.
  updateUser: (req, res) => {
    const { id } = req.params; // fetch id of a particular user.
    const usersData = req.body; // then fetch the users info.

    UserModel.updateUser(id, usersData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.json({ message: "User Updated Successfully..." });
    });
  },

  // Delete Mapping to remove user from table.
  deleteUser: (req, res) => {
    const { id } = req.params;

    UserModel.deleteUser(id, (err, result) => {
      if (err) {
        return res.status(404).json({ message: "User not found!" });
      } else {
        res.json({ message: "User Deleted Successfully...." });
      }
    });
  },
};

module.exports = UserController;
