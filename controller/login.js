const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();
const jwt = require("jsonwebtoken");
let msg = "";

router.get('/', (req, res) => {
    if (req.cookies["cred"] != null) {
        res.redirect("/userdash");
    } else {
        res.render('index/login', { msg: msg });
    }
})

router.post('/', (req, res) => {

    var user = {
        email: req.body.email,
        password: req.body.password
    };
    userModel.validate(user, function(status) {
        if (status) {
            msg = "";
            var secret = Buffer.from(user.email + ":" + user.password).toString('base64');
            res.cookie('cred', secret);
            userModel.getByEmail(user.email, function(results) {
                res.cookie('uname', results[0].username);
                res.cookie('type', results[0].type);
                res.cookie('Id', results[0].id);
                res.cookie('status', results[0].status);
                // const data = {
                //     username: results[0].username,
                //     email: results[0].email,
                // }
                if (results[0].status != "Unverified") {
                    if (results[0].type == "Admin") {
                        // res.redirect('/registration');
                    } else if (results[0].type == "Doctor") {
                        //res.redirect('/registration');
                    } else if (results[0].type == "Patient") {
                        // jwt.sign({ user: data }, "secretkey", { expiresIn: '1h' }, (err, token) => {
                        //     console.log(token);
                        //     res.cookie('token', token);
                        //     console.log(req.cookies["token"]);
                        // })
                        res.redirect('/userdash');
                    } else if (results[0].type == "Receptionist") {
                        //res.redirect('/registration');
                    }
                } else {
                    msg = "Unauthorized";
                    res.render('index/login', { msg: msg });
                }
            })
        } else {
            msg = "Unauthorized";
            res.render('index/login', { msg: msg });
            console.log("Failed");
        }
    });
})

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers["authorization"];
//     console.log(bearerHeader);
//     if (typeof bearerHeader !== "undefined") {
//         const bearerToken = bearerHeader.split(" ")[1];
//         req.token = bearerToken;
//         console.log(req.token);
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }
// router.get('/hello', (req, res) => {
//     jwt.verify(req.cookies["token"], 'secretkey', (err, authData) => {
//         if (err) {
//             console.log(req.cookies["token"]);
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 hello: "Hello"
//             });
//         }
//     });
// })



module.exports = router;