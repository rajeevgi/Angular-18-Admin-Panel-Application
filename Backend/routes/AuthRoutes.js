const express = require("express");
const LoginController = require("../controller/LoginController");

const router = express.Router();

// Login Route
router.post("/login", LoginController.loginUser);

// Logout Route
router.post("/logout", LoginController.logoutUser);

module.exports = router;
