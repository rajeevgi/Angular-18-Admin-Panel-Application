const LoginController = { 
  // User Logout
  logoutUser: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed!" });
      }
      res.json({ message: "Logout successful!" });
    });
  },

  // SuperAdmin or Admin logout
  logoutAdmin: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed!" });
      }
      res.json({ message: "Logout successful!" });
    });
  },
};

module.exports = LoginController;
