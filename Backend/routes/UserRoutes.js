const express = require("express");
const userController = require("../controller/UserController");
const loginController = require("../controller/LoginController");
const { checkRole } = require("../middleware/AuthMiddleware");

const router = express.Router();

// Routes for Super Admin and Admins only 
router.post("/login", loginController.loginUser)

router.get("/listAllUsers", checkRole(['superadmin','admin']), userController.getAllUsers);
router.get("/getUserById/:id", checkRole(['superadmin','admin']), userController.getUserById);
router.post("/saveUser", checkRole(['superadmin','admin']), userController.addUser);
router.put("/updateUser/:id", checkRole(['superadmin','admin']), userController.updateUser);
router.delete("/deleteUser/:id", checkRole(['superadmin','admin']), userController.deleteUser);

// Route for Users to fetch their own details
router.get("/getMyProfile", checkRole(['user']), userController.getMyProfile);

module.exports = router;
