require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
