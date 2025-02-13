const Admin = require("../model/Admin");

const AdminController = {
  loginAdmin: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    Admin.loginAdmin(username, password, (err, admin) => {
      if (err) {
        return res.status(401).json({ message: err.message });
      }

      // Store session data
      req.session.admin = {
        id: admin.id,
        username: admin.username,
        role: admin.role, // Either 'admin' or 'superadmin'
      };

      res.json({ message: "Login successful!", admin: req.session.admin });
    });
  },

  registerAdmin: (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (role !== "admin" && role !== "superadmin") {
      return res.status(400).json({ message: "Invalid role!" });
    }

    Admin.createAdmin({ username, password, role }, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ message: "Admin registered successfully!" });
    });
  },

  getAllAdmins: (req, res) => {
    if (!req.session.admin || req.session.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Access Denied!" });
    }

    Admin.getAllAdmins((err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error!" });
      }
      res.json(result);
    });
  },

  getAdminsById: (req, res) => {
    if (!req.session.admin || req.session.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Access Denied!" });
    }

    const { id } = req.params;

    Admin.getAdminsById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error!" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }
      res.json(result[0]);
    });
  },

  addAdmin: (req, res) => {
    if (!req.session.admin || req.session.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Access Denied!" });
    }

    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    Admin.createAdmin({ username, password, role }, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error!" });
      }
      res.status(201).json({ message: "Admin Added Successfully!" });
    });
  },

  updateAdmin: (req, res) => {
    if (!req.session.admin || req.session.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Access Denied!" });
    }

    const { id } = req.params;
    const adminData = req.body;

    Admin.updateAdmin(id, adminData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }

      res.json({ message: "Admin Updated Successfully!" });
    });
  },

  deleteAdmin: (req, res) => {
    if (!req.session.admin || req.session.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Access Denied!" });
    }

    const { id } = req.params;
    Admin.deleteAdmin(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }

      res.json({ message: "Admin Deleted Successfully!" });
    });
  },

  logoutAdmin: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed!" });
      }
      res.json({ message: "Logout successful!" });
    });
  },
};

module.exports = AdminController;
