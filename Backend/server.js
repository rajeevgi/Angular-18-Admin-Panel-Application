const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// cors setup (Allow frontend to send credentials)
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true 
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly:true, maxAge: 1000*60*60, sameSite: "lax" }
      })
);

// Routes
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const loginRoutes = require("./controller/LoginController");

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/logout", loginRoutes.logoutUser);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
