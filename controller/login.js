const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();

var msg = "";

router.get('/', (req, res) => {
    res.render('index/login', { msg: msg });
})

router.post('/', (req, res) => {

    var user = {
        email: req.body.email,
        password: req.body.password
    };

    userModel.validate(user, function(status) {
        if (status) {
            msg = "";
            res.cookie('email', req.body.email);
            res.redirect('/registration');
        } else {
            msg = "Unauthorized";
            res.render('index/login', { msg: msg });
            console.log("Failed");
        }
    });
})

module.exports = router;