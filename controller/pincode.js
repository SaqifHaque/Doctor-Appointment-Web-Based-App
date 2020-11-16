const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN });
var session = require('express-session');

router.get('/', (req, res) => {
    if (req.cookies['pin'] != null) {
        res.render('index/pincode', { otp: req.cookies['pin'] });
    } else {
        res.render('index/registration');
    }
})

router.post('/', (req, res) => {

    if (req.cookies['pin'] == req.body.pincode) {
        console.log("Pincode matched");
        res.redirect('/login');
    } else {
        console.log("wrong Pincode");
    }

})

module.exports = router;