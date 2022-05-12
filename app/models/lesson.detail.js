const sql = require("./db.js");
// const bcrypt = require('bcrypt');
const util = require('util');
const crypto = require('crypto');
const { compare } = require("bcrypt");
// constructor
const Ldetail = function (Ldetail) {
    // this.id = Ldetail.id;
    this.idlesson = Ldetail.idlesson;
    this.text = Ldetail.text;
    this.video = Ldetail.video;
    this.video = Ldetail.video;
    this.img = Ldetail.img;
    this.type = Ldetail.type;
};

Ldetail.create = function (newLdetail, result) {
    sql.query("INSERT INTO Ldetails SET ?", newLdetail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Ldetail: ", { id: res.insertId, newLdetail });
        result(null, { id: res.insertId, newLdetail });
    });
};

Ldetail.findById = (id, result) => {
    sql.query('SELECT * FROM Ldetails WHERE id =' + id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Ldetail: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Ldetail with the id
        result({ kind: "not_found" }, null);
    });
};

Ldetail.getAll = (Ldetailname, result) => {
    let query = "SELECT * FROM Ldetails";

    // if (Ldetailname) {
    //     query += ` WHERE type LIKE '%${Ldetailname}%'`;
    // }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Ldetails: ", res);
        result(null, res);
    });
};

// Ldetail.findByType = (type, result) => {
//     sql.query("SELECT * FROM Ldetails WHERE type='${type}'", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("Ldetails: ", res);
//         result(null, res);
//     });
// };

Ldetail.updateById = (id, Ldetail, result) => {
    sql.query(
        "UPDATE Ldetails SET text = ?, video = ?, img = ?, type = ? WHERE id = ?",
        [Ldetail.text, Ldetail.video, Ldetail.img, type, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Ldetail with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Ldetail: ", { id: id, ...Ldetail });
            result(null, { id: id, ...Ldetail });
        }
    );
};

Ldetail.remove = (id, result) => {
    sql.query("DELETE FROM Ldetails WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Ldetail with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Ldetail with id: ", id);
        result(null, res);
    });
};

Ldetail.removeAll = (id, result) => {
    sql.query("DELETE FROM Ldetails WHERE idlesson = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Ldetails`);
        result(null, res);
    });
};

module.exports = Ldetail;
