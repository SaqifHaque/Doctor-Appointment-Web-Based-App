const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();

var msg = "";

router.get('/:str', (req, res) => {


    const file = `assets/uploads/${req.params.str}`;
    res.download(file); // Set disposition and send it.
    // res.render('Home');

});

module.exports = router;