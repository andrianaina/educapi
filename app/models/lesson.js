const sql = require("./db.js");
// const bcrypt = require('bcrypt');
const util = require('util');
const crypto = require('crypto');
const { compare } = require("bcrypt");
// constructor
const Lesson = function (lesson) {
    // this.id = lesson.id;
    this.name = lesson.name;
    this.iconpath = lesson.iconpath;
    this.level = lesson.level;
    this.isdeleted = lesson.isdeleted;
};
Lesson.create = function (newLesson, result) {
    sql.query("INSERT INTO Lessons SET ?", newLesson, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Lesson: ", { id: res.insertId, newLesson });
        result(null, { id: res.insertId, newLesson });
    });
};

//mety atreto
Lesson.findById = (id, result) => {
    mysql = 'SELECT * FROM Lessons WHERE id = %d';
    mysql = util.format(mysql, id);
    sql.query(mysql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Lesson: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Lesson with the id
        result({ kind: "not_found" }, null);
    });
};

Lesson.getAll = (name, result) => {
    let query = "SELECT * FROM Lessons";

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Lessons: ", res);
        result(null, res);
    });
};

// Lesson.findByType = (type, result) => {
//     sql.query("SELECT * FROM Lessons WHERE type='${type}'", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("Lessons: ", res);
//         result(null, res);
//     });
// };

Lesson.updateById = (id, Lesson, result) => {
    sql.query(
        "UPDATE Lessons SET name = ?, level = WHERE id = ?",
        [Lesson.name, Lesson.level, Lesson.type, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Lesson with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Lesson: ", { id: id, ...Lesson });
            result(null, { id: id, ...Lesson });
        }
    );
};

Lesson.remove = (id, result) => {
    sql.query("UPDATE Lessons SET isdeleted = 1 WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Lesson with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Lesson with id: ", id);
        result(null, res);
    });
};

// Lesson.removeAll = result => {
//     sql.query("DELETE FROM Lessons", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} Lessons`);
//         result(null, res);
//     });
// };

module.exports = Lesson;
