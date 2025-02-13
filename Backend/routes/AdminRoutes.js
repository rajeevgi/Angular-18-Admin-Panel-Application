const express = require("express");
const adminController = require("../controller/AdminController");
const { checkRole } = require("../middleware/AuthMiddleware");
const router = express.Router();

// Routes only for Super Admin
router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);

router.get("/listAllAdmins", checkRole(['superadmin']), adminController.getAllAdmins);
router.get("/getAdminById/:id", checkRole(['superadmin']), adminController.getAdminsById);
router.post("/saveAdmin", checkRole(['superadmin']), adminController.addAdmin);
router.put("/updateAdmin/:id", checkRole(['superadmin']), adminController.updateAdmin);
router.delete("/deleteAdmin/:id", checkRole(['superadmin']), adminController.deleteAdmin);

module.exports = router;