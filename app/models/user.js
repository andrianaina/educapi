const sql = require("./db.js");
// const bcrypt = require('bcrypt');
const util = require('util');
const crypto = require('crypto');
const { compare } = require("bcrypt");
// constructor
const User = function (User) {
    // this.id = User.id;
    this.username = User.username;
    this.mdp = User.mdp;
    this.type = User.type;
};
User.create = function (newUser, result) {

    newUser.mdp = crypto.createHash('md5').update(newUser.mdp).digest('hex');

    bcrypt.hash(newUser.mdp, 5, function (err, cryptedpassword) {
        newUser.mdp = cryptedpassword;
    });
    sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created User: ", { id: res.insertId, newUser });
        result(null, { id: res.insertId, newUser });
    });
};
User.login = (username, mdp, result) => {
    var mysql = "SELECT * FROM Users WHERE username = '%s'";
    mysql = util.format(mysql, username);

    sql.query(mysql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            hash = crypto.createHash('md5').update(mdp).digest('hex');
            console.log(compare(hash, res[0].mdp))
            if (compare(hash, res[0].mdp)) {
                result(null, res[0]);
                return;
            }
        }
        // not found User
        result({ kind: "not_found" }, null);
    });
}

//mety atreto

User.findById = (id, result) => {
    sql.query('SELECT * FROM Users WHERE id = ${id}', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (username, result) => {
    let query = "SELECT * FROM Users";

    if (username) {
        query += ` WHERE username LIKE '%${username}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

User.findByType = (type, result) => {
    sql.query("SELECT * FROM Users WHERE type='${type}'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};
User.updateById = (id, User, result) => {
    sql.query(
        "UPDATE Users SET username = ?, mdp = ?, type = ? WHERE id = ?",
        [User.username, User.mdp, User.type, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated User: ", { id: id, ...User });
            result(null, { id: id, ...User });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted User with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Users`);
        result(null, res);
    });
};

module.exports = User;
