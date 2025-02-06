const db = require("../config/database");    // interact with db.js

// user entity
const User = {

    // select query to get all the users from the table.
    getAllUsers: (callback) => {
        console.log("this is", callback)
        db.query("select * from users", callback);
    },

    // select query to get users by id.
    getUserById : (id, callback) => {
        db.query("select * from users where id = ?", [id], callback);
    },

    // insert query to add a user into users table.
    createUser : (usersData, callback) => {
        const { name , email, password } = usersData;

        db.query("insert into users (name, email, password) values (?,?,?)", [name], [email], [password], callback);
    },

    // update query to modify users details.
    updateUser : (id, usersData, callback) => {
        const { name, email, password } = usersData;
        const query = "Update users set name = ? , email = ? , password = ? where id = ?";
        const values = [name, email, password, id];
       
        db.query(query, values, (err, result) => {
            if(err){
                return callback(err,null);
            }

            callback(null, result);
        });
    },

    // delete query to remove user from a table.
    deleteUser : (id, callback) => {
        db.query("delete from users where id = ?",[id], callback);
    },
}

module.exports = User;