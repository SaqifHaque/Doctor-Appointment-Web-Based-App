const express = require('express');
const userModel = require.main.require('./models/crud-model');
const ratingModel = require.main.require('./models/rating-model')
const router = express.Router();

router.get('/', (req, res) => {

    // if (req.cookies['cred'] != null) {
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
            //var str = results[0].avaibality;
            var str = "Thu,Sat";
            var str2 = "14-18";
            var time = str2.split("-");
            var schedule = str.split(",");
            let arr = [];
            let arr2 = [];
            var d = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sun";
            weekday[1] = "Mon";
            weekday[2] = "Tue";
            weekday[3] = "Wed";
            weekday[4] = "Thu";
            weekday[5] = "Fri";
            weekday[6] = "Sat";
            for (var i = 0; i < 10; i++) {
                d.setDate(d.getDate() + 1)
                var n = weekday[d.getDay()];
                if (schedule.includes(n)) {
                    let format = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
                    arr.push(format);
                    console.log(arr);

                }
            }
            hour = time[0];
            while (time[1] != hour) {
                var timeformat = hour + ":00 -" + (parseInt(hour) + 1).toString() + ":00";
                console.log(timeformat);
                hour = (parseInt(hour) + 1).toString();
                arr2.push(timeformat);

            }
            ratingModel.getById(req.params.id, function(reviews) {
                var rating = 0;
                for (var j = 0; j < reviews.length; j++) {
                    rating += reviews[j].rating;
                }
                rating = rating / reviews.length;
                res.render('user/appointment', { Doctor: results, date: arr, time: arr2, reviews: reviews, avg: rating })
            })
        })
})
router.get('/navbar', (req, res) => {


    res.render('shared/navbar');

})
router.get('/review/:id', (req, res) => {
    res.render('user/review');
})

router.post('/review/:id', (req, res) => {

    var rating = {
        rating: req.body.rating,
        review: req.body.review,
        d_Id: req.params.id,
        u_Id: req.cookies["Id"]
    }

    ratingModel.insert(rating, function(status) {
        if (status) {
            res.redirect('/userdash');
        } else {
            console.log("Server Error");
        }

    })

})
router.get('/search/:str', (req, res) => {

    userModel.getDoctors(function(results) {
        const result = results.filter(doc => doc.username.toLowerCase() === req.params.str.toLowerCase() ||
            doc.specialization.toLowerCase() === req.params.str.toLowerCase());
        console.log(result);
        res.render('user/search', { Doctors: result });
    })

})

module.exports = router;