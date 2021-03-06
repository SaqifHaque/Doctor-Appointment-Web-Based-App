const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();
const mailgun = require("mailgun-js");
require('dotenv').config();
const { check, validationResult } = require('express-validator');

const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN });
var session = require('express-session');
var msg = "";

router.get('/', (req, res) => {
    if (req.cookies["cred"] != null) {
        res.redirect("/userdash");
    } else {
        res.render('index/registration', { msg: msg });
    }
})

router.post('/', [
    check('username', 'Invalid Username')
    .exists()
    .isLength({ min: 4 }),
    check('email', 'Invalid Email')
    .exists()
    .isEmail(),
    check('bloodgroup', 'Invalid bloodgroup')
    .exists()
    .isLength({ min: 2 }),
    check('phone', 'Invalid Phone')
    .exists()
    .isLength({ min: 15 })
    .isLength({ max: 15 }),
    check("password", "invalid password")
    .exists()
    .isLength({ min: 4 }),
    check("confirmpass", "Doesnt Match with password")
    .custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error("Passwords don't match");
        } else {
            return val;
        }
    }),
    check("gender", "invalid gender")
    .exists()
    .isLength({ min: 2 })
], (req, res) => {
    userModel.getByEmail(req.body.email, function(result) {

        if (result.length > 0) {
            msg = "exists";
            res.render('index/registration', { msg: msg });
        } else {
            msg = "";
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log("validation failed");
                const alert = errors.array();
                alert.forEach(myFunction);

                function myFunction(item) {
                    console.log(item);
                }
                // const alert = errors.array();
                // res.rtender('index/registration', {
                //     alert
                // })
                // console.log("validation failed");
            } else {
                console.log("Validation ok")
                const pincode = Math.floor(1000 + Math.random() * 9000).toString();
                res.cookie('pin', pincode);
                res.cookie('verification', req.body.email);
                var user = {
                    username: req.body.username,
                    email: req.body.email,
                    bloodgroup: req.body.bloodgroup,
                    phone: req.body.phone,
                    password: Buffer.from(req.body.password).toString('base64'),
                    profilepic: "...",
                    type: "Patient",
                    status: "Unverified",
                    gender: req.body.gender
                };
                msg = "";

                userModel.insert(user, function(status) {
                    if (status) {
                        const pincode = Math.floor(1000 + Math.random() * 9000).toString();
                        res.cookie('pin', pincode);
                        console.log(pincode);
                        const data = {
                            from: 'no-reply@BetterCallDoc.com',
                            to: user.email,
                            subject: 'Email Verfication',
                            text: 'Your Pincode is - ' + pincode
                        };
                        mg.messages().send(data, function(error, body) {
                            console.log(body);
                        });
                        console.log("success");
                        res.redirect('/pincode');
                    } else {
                        console.log("server failure");
                    }
                });
            }
        }
    })
})


module.exports = router;