const mysql = require('mysql2');

require("dotenv").config();

// configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || "admin_db" 
});

// authentication
db.connect((err) => {
    if(err){
        console.error("Database Connection Failed!", err);
    }else{
        console.log("Database connected successfully...");
    }
});

module.exports = db;