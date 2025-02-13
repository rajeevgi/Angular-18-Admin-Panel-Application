const User = require("../model/User");

const LoginController = {
  // User Login
  loginUser: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    User.loginUser(email, password, (err, user) => {
      if (err) {
        return res.status(401).json({ message: err.message });
      }

      // Store session data
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user", // Default role for users
      };

      res.json({ message: "Login successful!", user: req.session.user });
    });
  },

  // User Logout
  logoutUser: (req, res) => {
    req.session = null; // Ensure session cleanup
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed!" });
      }
      res.json({ message: "Logout successful!" });
    });
  },
};

module.exports = LoginController;
