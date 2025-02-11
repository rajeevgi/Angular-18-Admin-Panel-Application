const mysql = require("mysql2");
require("dotenv").config();

// Database Configuration
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
});

// Check Database Connection/ Authentication
db.connect((err) => {
    if(err){
        console.log("Database Connection Failed!", err);
    }else{
        console.log("Database Connected Successfully...");
    }
});

module.exports = db;
