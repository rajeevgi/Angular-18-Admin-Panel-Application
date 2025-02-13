require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const authRoutes = require("./routes/AuthRoutes");

const app = express();

// cors setup (Allow frontend to send credentials)
app.use(cors({
   origin: 'http://localhost:4200', 
   credentials: true 
}));

app.use(express.json());
app.use(bodyParser.json());  
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes (Place after session middleware)
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);

// Middleware to prevent unauthorized users
app.use((req, res, next) => {
  if(!req.session.user && !req.path.includes("/login")){
    return res.status(401).json({ message : "Unauthorized! Please login."});
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
