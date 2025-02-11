const db = require("../config/database"); // interact with db.js

// user entity
const User = {
  // select query to get all the users from the table.
  getAllUsers: (callback) => {
    db.query("select * from users", callback);
  },

  // select query to get users by id.
  getUserById: (id, callback) => {
    db.query("select * from users where id = ?", [id], callback);
  },

  // insert query to add a user into users table.
  createUser: (usersData, callback) => {
    const { name, email, password } = usersData;

    db.query(
      "insert into users (name, email, password) values (?,?,?)",
      [name, email, password],
      callback
    );
  },

  // update query to modify users details.
  updateUser: (id, usersData, callback) => {
    const { name, email, password } = usersData;
    const values = [ name, email, password, id ];
    const sql = "Update users set name = ?, email = ?, password = ? where id = ?";
    db.query(sql, values, (err, result) => {
      if(err){
        return callback(err, null);
      }else{
        return callback(null, result);
      }
    });
  },

  // delete query to remove user from a table.(admin only)
  deleteUser: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },
};

module.exports = User;
