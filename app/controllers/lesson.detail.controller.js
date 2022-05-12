const Ldetail = require("../models/lesson.detail.js");
const express = require('express');
const routeur = express.Router("../models/lesson.detail.js");
const jwtUtils = require("../models/jwt.util")
const multer = require('multer')
const path = require('path');
const req = require("express/lib/request");

const storage = multer.diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
        return cb(null, file.filename + '_' + Date.now() + '' + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
})
// function errHandler(err,req,res,next){
//     if(err instanceof multer.MulterError){
//         ress
//     }
// }

routeur.use('/profile', express.static('upload'));
routeur.post('/upload', upload.single('profile, (req, res => {
    res.json({
    success: 1,
    profile_url: 'http//localhost:4000/profile/' + req.file.filename
})
})))
routeur.post("/", upload.single('profile'), (req, res) => {
    console.log(req.file);
    // Validate request
    // if (!req.body) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    // }

    // // import files
    // if (req.files) {
    //     var file = req.files.file;
    //     var filename = file.name;
    //     file.mv('./uploads/' + filename, function (err) {
    //         if (err) {
    //             res.send(err)
    //         }
    //         else {
    //             console.log(filename + "uploaded")
    //         }
    //     })
    // }

    // Save User in the database
    // User.create(users, (err, data) => {
    //     if (err)
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the User"
    //         });
    //     else res.send(data);
    // });
});