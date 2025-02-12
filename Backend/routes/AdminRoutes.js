const express = require("express");
const adminController = require("../controller/AdminController");
const router = express.Router();

// Routes
router.get("/admins", adminController.getAllAdmins);
router.get("/admins/:id", adminController.getAdminsById);
router.post("/admins", adminController.addAdmin);
router.put("/admins/:id", adminController.updateAdmin);
router.delete("/admins/:id", adminController.deleteAdmin);

module.exports = router;