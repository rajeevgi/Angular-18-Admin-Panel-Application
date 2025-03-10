const admin = require("../model/Admin");

const AdminController = {
  // Admin/Super Admin Login
  loginAdmin: (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    admin.loginAdmin(username, password, role, (err, admin) => {
      if (err) {
        return res.status(401).json({ message: err.message });
      }

      console.log("🔹 Admin Role from DB:", admin.role); // Debugging role from DB

      // Store session data
      req.session.user = {
        id: admin.id,
        username: admin.username,
        role: admin.role, // Role will be "admin" or "superadmin"
      };

      console.log("Session Data : ", req.session);

      res.json({ message: "Login successful!", user: req.session.user });
    });
  },

  getAllAdmins: (req, res) => {
    admin.getAllAdmins((err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message || "Internal Server Error!" });
      }
      res.json({ result });
    });
  },

  getAdminsById: (req, res) => {
    const { id } = req.params;

    admin.getAdminsById(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message || "Internal Server Error!" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }
      res.json(result[0]);
    });
  },

  addAdmin: (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    admin.createAdmin({ username, password }, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message || "Internal Server Error!" });
      }
      res.status(201).json({ message: "Admin Added Successfully!" });
    });
  },

  updateAdmin: (req, res) => {
    const { id } = req.params;
    const adminData = req.body;

    admin.updateAdmin(id, adminData, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message || "Internal Server Error!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }

      res.json({ message: "Admin Updated Successfully!" });
    });
  },

  deleteAdmin: (req, res) => {
    const { id } = req.params;
    admin.deleteAdmin(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message || "Internal Server Error!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }

      res.json({ message: "Admin Deleted Successfully!" });
    });
  },
};

module.exports = AdminController;
