require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/AdminRoutes");

const app = express();

// cors setup (Allow frontend to send credentials)
app.use(cors({
   origin: 'http://localhost:4200', 
   credentials: true 
}));

app.use(bodyParser.json());  
// Routes (Place after session middleware)
app.use("/api", userRoutes);
app.use("/api", adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
