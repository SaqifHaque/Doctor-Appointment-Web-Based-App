const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index/registration');
})

router.post('/', (req, res) => {

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
            console.log("success");
            res.redirect('/index/login');
        } else {
            console.log("server failure");
        }
    });
})

module.exports = router;