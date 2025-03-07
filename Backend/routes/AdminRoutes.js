const express = require("express");
const adminController = require("../controller/AdminController");
const loginController = require("../controller/LoginController");
const registerController = require("../controller/RegisterController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();

// Login Routes only for Super Admin or Admin
router.post("/login", adminController.loginAdmin);
router.post("/logout", loginController.logoutAdmin);

// Register Routes Only for Super Admin or Admin
router.post("/register",AuthMiddleware.isSuperAdmin, registerController.registerAdmin)

router.get("/listAllAdmins",AuthMiddleware.isSuperAdmin, adminController.getAllAdmins);
router.get("/getAdminById/:id",AuthMiddleware.isSuperAdmin, adminController.getAdminsById);
router.post("/saveAdmin",AuthMiddleware.isSuperAdmin, adminController.addAdmin);
router.put("/updateAdmin/:id",AuthMiddleware.isSuperAdmin, adminController.updateAdmin);
router.delete("/deleteAdmin/:id",AuthMiddleware.isSuperAdmin, adminController.deleteAdmin);

module.exports = router;