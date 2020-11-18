const express = require('express');
const userModel = require.main.require('./models/crud-model');
const router = express.Router();

router.get('/', (req, res) => {

    // if (req.cookies['cred'] != null) {
    var arr = [];
    var specialization = "";
    var qualification = "";
    var avaibality = "";
    userModel.getDoctors(function(results) {
            res.render('user/userdash', { Doctors: results });
        })
        // } else {

    //     res.render('index/login');
    // }
})

router.get('/appointment/:id', (req, res) => {

    userModel.getDoctorById(req.params.id,
        function(results) {
            var str = "Sunday,Monday,Tuesday";
            var schedule = str.split(",");
            let arr = [];
            var d = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            for (var i = 0; i < 7; i++) {
                d.setDate(d.getDate() + 1)
                var n = weekday[d.getDay()];
                if (schedule.includes(n)) {
                    let format = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
                    arr.push(format);
                    console.log(arr);

                }
            }
            res.render('user/appointment', { Doctor: results, date: arr })
        })
})
router.get('/navbar', (req, res) => {

    res.render('shared/navbar');

})
module.exports = router;