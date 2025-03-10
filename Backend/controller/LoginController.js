const adminslogin = require("../model/Admin");
const usersLogin = require("../model/User");

const LoginController = {
  // Admin or Superadmin or user login
  login: (req, res) => {
    const { username, email, password, role } = req.body;

    if (!(username || email) || !password) {
      return res
        .status(400)
        .json({ error: "Username/Email and Password are required" });
    }

    if (role) {
      // Admin or SuperAdmin Login
      adminslogin.loginAdmin(username, password, role, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result)
          return res.status(401).json({ message: "Invalid Credentials" });

        req.session.user = {
          id: result.id,
          username: result.username,
          role: result.role,
          type: "admin",
        };

        return res
          .status(200)
          .json({ message: "Login Successful", user: req.session.user });
      });
    } else {
      // Regular User Login
      usersLogin.loginUser(email, password, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result)
          return res.status(401).json({ message: "Invalid Credentials" });

        req.session.user = {
          id: result.id,
          email: result.email,
          type: "user",
        };

        return res
          .status(200)
          .json({ message: "Login Successful", user: req.session.user });
      });
    }
  },

  // User Logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      return res.json({ message: "Logged out successfully" });
    });
  },
};

module.exports = LoginController;
