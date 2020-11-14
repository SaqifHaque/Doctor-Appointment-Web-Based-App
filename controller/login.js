const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index/login')
})

router.post('/', (req, res) => {

    var user = {
        email: req.body.email,
        password: req.body.password
    };

    userModel.validate(user, function(status) {
        if (status) {
            console.log("success");
            res.cookie('uname', req.body.email);
            res.redirect('/registration');
        } else {
            console.log("Failed");
            res.redirect('/login');
        }
    });

})

module.exports = router;