const cookieParser = require('cookie-parser');
const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();

var msg = "";

router.get('/', (req, res) => {

    res.clearCookie('uname');
    res.clearCookie('type');
    res.clearCookie('Id');
    res.clearCookie('status');
    res.clearCookie('cred');
    res.redirect("/login");

});

module.exports = router;