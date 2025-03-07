const express = require("express");
const userController = require("../controller/UserController");
const registerController = require("../controller/RegisterController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

// Register Routes for Super Admin and Admin Only
router.post("/register", registerController.registerUser);

// Login Routes for User only
router.post("/login", userController.loginUser)

router.get("/listAllUsers", AuthMiddleware.isAdminOrSuperAdmin, userController.getAllUsers);
router.get("/getUserById/:id", AuthMiddleware.isAdminOrSuperAdmin, userController.getUserById);
router.post("/saveUser", AuthMiddleware.isAdminOrSuperAdmin, userController.addUser);
router.put("/updateUser/:id", AuthMiddleware.isAdminOrSuperAdmin, userController.updateUser);
router.delete("/deleteUser/:id", AuthMiddleware.isAdminOrSuperAdmin, userController.deleteUser);

module.exports = router;
