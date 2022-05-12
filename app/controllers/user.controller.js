const User = require("../models/user.js");
const express = require('express');
const routeur = express.Router("../models/user.js");
const bcrypt = require('bcrypt');
const jwtUtils = require("../models/jwt.util")
// Create and Save a new User
routeur.post("/", (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const users = new User({
        username: req.body.username,
        mdp: req.body.mdp,
        type: req.body.type || 'user'
    });

    // Save User in the database
    User.create(users, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User"
            });
        else res.send(data);
    });
});

// Retrieve all Users from the database (with condition).
routeur.get("/:username", (req, res) => {
    const username = req.params.username;

    User.getAll(username, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User"
            });
        else res.send(data);
    });
});
//login
routeur.post("/login", (req, res) => {
    User.login(req.body.username, req.body.mdp, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Not found User'
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User "
                });
            }
        } else {
            res.send({
                user: data,
                token: jwtUtils.generateTokenForUser(data)
            });
        }

    });
});
// // Find a single User by Id
routeur.get("/findbyId/:id", (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        } else res.send(data);
    });
});

// // find by type Users
routeur.get("/findbyType/:type", (req, res) => {
    User.findByType(req.params.type, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        else res.send(data);
    });
});

// // Update a User identified by the id in the request
routeur.put("/update/:id", (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
});

// // Delete a User with the specified id in the request
routeur.delete("/delete/:id", (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
});

// // Delete all Users from the database.
routeur.delete("/", (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        else res.send({ message: `All Users were deleted successfully!` });
    });
});
module.exports = routeur;