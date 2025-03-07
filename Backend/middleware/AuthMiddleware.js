const AuthMiddleware = {
    isAuthenticated: (req, res, next) => {
        console.log("🔹 Checking Session in Middleware:", req.session);
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "Unauthorized access!" });
        }
        next();
    },

    isSuperAdmin: (req, res, next) => {
        console.log("🔹 Checking Super Admin Access:", req.session);

        if(!req.session || !req.session.user){
            console.log("No session or user found!");
            return res.status(401).json({ message : "Unauthorized Access!" });
        }

        if (req.session.user.role !== "superadmin") {
            console.log("Role Mismatch", req.session.user.role);
            return res.status(403).json({ message: "Access Denied! Super admins only." });
        }
        console.log("Access Granted to super admin only.")
        next();
    },

    isAdminOrSuperAdmin: (req, res, next) => {
        if (!req.session.user || (req.session.user.role !== "admin" && req.session.user.role !== "superadmin")) {
            return res.status(403).json({ message: "Access Denied! Admins or Super Admins only." });
        }
        next();
    }
};

module.exports = AuthMiddleware;
