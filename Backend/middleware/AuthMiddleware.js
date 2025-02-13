const checkRole = (roles) => {
    return (req, res, next) => { // Added `next` as a parameter
        if (!req.session.user || !roles.includes(req.session.user.role)) {
            return res.status(403).json({ message: "Access Denied!" });
        }
        next(); // Call `next()` to proceed with the request
    };
};

module.exports = { checkRole };
