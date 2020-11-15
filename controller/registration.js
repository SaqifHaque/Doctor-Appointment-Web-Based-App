const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();
const mailgun = require("mailgun-js");
require('dotenv').config();
const { check, validationResult } = require('express-validator');

const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN });
var session = require('express-session');

router.get('/', (req, res) => {

    res.render('index/registration');
})

router.post('/', [
    check('username', 'Invalid Username')
    .exists()
    .isLength({ min: 3 }),

], (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // const alert = errors.array();
        // res.render('index/registration', {
        //     alert
        // })
    } else {
        var user = {
            username: req.body.username,
            email: req.body.email,
            bloodgroup: req.body.bloodgroup,
            phone: req.body.phone,
            password: req.body.password,
            profilepic: "...",
            type: "Patient",
            status: "unverified",
            gender: req.body.gender
        };

        userModel.insert(user, function(status) {
            if (status) {
                const pincode = Math.floor(1000 + Math.random() * 9000).toString();
                res.cookie('pin', pincode);
                console.log(pincode);
                // const data = {
                //     from: 'no-reply@BetterCallDoc.com',
                //     to: user.email,
                //     subject: 'Email Verfication',
                //     text: 'Your Pincode is - ' + pincode
                // };
                // mg.messages().send(data, function(error, body) {
                //     console.log(body);
                // });
                console.log("success");
                res.redirect('/pincode');
            } else {
                console.log("server failure");
            }
        });
    }
})

module.exports = router;