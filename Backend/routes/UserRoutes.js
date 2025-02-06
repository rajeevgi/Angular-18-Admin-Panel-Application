const express = require('express');  // require express routing.

const userController = require("../controller/UserController");

const router = express.Router();

router.get("/users", userController.getAllUsers);   // endpoints to get all users.
router.get("/users/:id", userController.getUserById) // endpoints to get a user by id.
router.post("/users", userController.addUser);    // endpoints to add user into table.
router.put("/users/:id", userController.updateUser);  // endpoints to update user.
router.delete("/users/:id", userController.deleteUser);  // endpoints to delete user.

module.exports = router;

