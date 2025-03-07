const UserModel = require("../model/User"); // Interact with model or entity.
// const Admin = require("../model/Admin");

const UserController = { 

  // Login Route for user
  loginUser : (req, res) => {
    const { email, password} = req.body;

    if (!email && !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    UserModel.loginUser(email, password, (err, user) => {
      if(err) {
        return res.status(500).json({ message : "Internal Server error!" });
      }

      // Store session data
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      console.log("Session Details : ", user);
      res.json(user);
    });
  },

  // Get Mapping to get all users.(Only For Super Admin and Admin)
  getAllUsers: (req, res) => {
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
    // if ((req.session.user.role !== "superadmin" && req.session.user.role !== "admin")) {
    //   return res.status(403).json({ message: "Access Denied!" });
    // }

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
    UserModel.updateUser(id, req.body, (err, result) => {
        if (err) {
          console.error("Error Updating user!", err);
          return res.status(500).json({ error: "Internal Server Error!" });
        }
        if (result === 0) {
          return res.status(404).json({ message: "User not found!" });
        }
        res.json({ message: "User Updated Successfully.", result });
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
      if (result === 0) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.json({ message: "User Deleted Successfully.", result });
    });
  },

};

module.exports = UserController;
