const Admin = require("../model/admin");

const AdminController = {
  // Get Mapping to get all admins.
  getAllAdmins: (req, res) => {
    Admin.getAllAdmins((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
      }
      res.json(result);
    });
  },

  // Get Mapping to get an admin by id.
  getAdminsById: (req, res) => {
    const { id } = req.params;

    Admin.getAdminsById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }
      res.json(result[0]);
    });
  },

  // Post Mapping to add admins.
  addAdmin: (req, res) => {
    const adminData = req.body;
    const { username, password } = adminData;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    Admin.createAdmin(adminData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
      }
      res.status(201).json({ message: "Admin Added Successfully!" });
    });
  },

  // Put Mapping to update admin details.
  updateAdmin: (req, res) => {
    const { id } = req.params;
    const adminData = req.body;

    Admin.updateAdmin(id, adminData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }

      res.json({ message: "Admin Updated Successfully!" });
    });
  },

  // Delete Mapping to remove admin.
  deleteAdmin: (req, res) => {
    const { id } = req.params;
    Admin.deleteAdmin(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Admin not found!" });
      }

      res.json({ message: "Admin Deleted Successfully!" });
    });
  },
};

module.exports = AdminController;
