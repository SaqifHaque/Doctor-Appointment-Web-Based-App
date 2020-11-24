const express = require('express');
const userModel = require.main.require('./models/crud-model');
const ratingModel = require.main.require('./models/rating-model');
const ambulanceModel = require.main.require('./models/ambulance-model');
const appointmentModel = require.main.require('./models/appointment-model');
const noticeModel = require.main.require('./models/notice-model');
const complainModel = require.main.require('./models/complain-model');
const labModel = require.main.require('./models/lab-model');
const membershipModel = require.main.require('./models/membership-model');
const router = express.Router();
const pdf = require('html-pdf');
const options = { format: 'A4' };
const fs = require('fs');
const { check, validationResult } = require('express-validator');
var msg = "";

router.post('/pdf/:id', (req, res) => {
    appointmentModel.getPrescriptionById(req.params.id, function(result) {
        res.render('pdf/demopdf', { data: result }, function(err, html) {
            pdf.create(html, options).toFile('./assets/Uploads/prescription.pdf', function(err, out) {
                if (err) return console.log(err);
                else {
                    var datafile = fs.readFileSync('./assets/Uploads/prescription.pdf');
                    res.header('content-type', 'application/pdf');
                    res.send(datafile);
                }
            })
        })
    })
})
router.get('/', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        userModel.getDoctors(function(results) {
            res.render('user/userdash', { Doctors: results });
        })
    } else {

        res.redirect('/login');
    }
})

router.get('/appointment/:id', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        userModel.getDoctorById(req.params.id,
            function(results) {
                //var str = results[0].avaibality;
                var str = results[0].availability;
                var str2 = results[0].time;
                var time = str2.split("-");
                var schedule = str.split(",");
                let arr = [];
                let arr2 = [];
                let arr3 = [];
                var d = new Date();
                var weekday = new Array(7);
                weekday[0] = "Sun";
                weekday[1] = "Mon";
                weekday[2] = "Tue";
                weekday[3] = "Wed";
                weekday[4] = "Thu";
                weekday[5] = "Fri";
                weekday[6] = "Sat";
                for (var i = 0; i < 20; i++) {
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
                    var che = "";
                    for (var j = 0; j < reviews.length; j++) {
                        rating += reviews[j].rating;
                    }
                    rating = rating / reviews.length;
                    var cost = "";
                    if (req.cookies['status'] == "Verified:Premium") {
                        cost = (parseInt(results[0].charge) - (parseInt(results[0].charge) * 0.1)).toString();
                        che = "pre";
                    } else if (req.cookies['status'] == "Verified:Finance") {
                        cost = "0";
                        che = "check";
                    } else {
                        cost = results[0].charge;
                    }
                    console.log(cost);
                    console.log(req.cookies["status"]);
                    res.render('user/appointment', { charge: cost, Doctor: results, date: arr, time: arr2, reviews: reviews, avg: rating, status: che })
                })
            })
    } else {

        res.redirect('/login');
    }
})
router.post('/appointment/:id', [
    check('app_date', 'Invalid date')
    .exists()
    .isLength({ min: 1 }),
    check('app_time', 'Invalid time')
    .exists()
    .isLength({ min: 1 }),
    check('tran', 'Invalid transaction Id')
    .exists()
    .isLength({ min: 10 }),
], (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        const errors = validationResult(req)
        if (req.cookies["status"] == "Verified:Finance") {

            if (errors.length > 1) {

            } else {
                var app = {
                    date: req.body.app_date,
                    time: req.body.app_time,
                    status: "pending",
                    d_Id: req.params.id,
                    u_Id: req.cookies["Id"],
                    p_Id: ""

                }
                appointmentModel.insert(app, function(status) {
                    if (status) {
                        res.redirect('../apptable');
                    }

                })

            }

        } else {
            const alert = errors.array();
            if (alert.length == 1 && req.body.cash == "cash") {
                var app = {
                    date: req.body.app_date,
                    time: req.body.app_time,
                    status: "pending",
                    d_Id: req.params.id,
                    u_Id: req.cookies["Id"],
                    p_Id: ""

                }
                appointmentModel.insert(app, function(status) {
                    if (status) {
                        res.redirect('../apptable');
                    }
                })
            } else if (!errors.isEmpty()) {
                console.log("validation failed");
                alert.forEach(myFunction);
                const alert = errors.array();

                function myFunction(item) {
                    console.log(item);
                }
            } else {
                var app = {
                    date: req.body.app_date,
                    time: req.body.app_time,
                    status: "pending",
                    d_Id: req.params.id,
                    u_Id: req.cookies["Id"],
                    p_Id: ""

                }
                appointmentModel.insert(app, function(status) {
                    if (status) {
                        var inv = {
                            total: req.body.cost,
                            transaction: req.body.tran,
                            status: "pending",
                            date: new Date().toLocaleDateString(),
                            u_Id: req.cookies["Id"]
                        }
                        if (req.body.cash == "bkash") {
                            appointmentModel.insertInvoice(inv, function(status) {
                                if (status) {
                                    res.redirect('../apptable');
                                    console.log("bkash");
                                } else {
                                    console.log("invoice error");
                                }
                            })
                        } else {
                            console.log("cash");
                            res.redirect('../apptable');
                        }
                    } else {
                        console.log("error");
                    }
                })
            }

        }
    } else {
        res.redirect('/login');
    }
})
router.get('/navbar', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        res.render('shared/navbar', { name: req.cookies["uname"] });
    } else {
        res.redirect('/login');
    }

})
router.get('/notice', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        noticeModel.getNotice(function(results) {
            res.send(JSON.stringify(results));
        })
    } else {
        res.redirect('/login');
    }

})
router.get('/review/:id', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        ratingModel.checkRating(req.params.id, req.cookies["Id"], function(results) {
            if (results.length > 0) {
                res.render('user/review', { msg: "Rated" });
            } else {
                res.render('user/review', { msg: "" });
            }
        })
    } else {
        res.redirect('/login');
    }
})

router.post('/review/:id', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
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
    } else {
        res.redirect('/login');
    }
})
router.get('/search/:str', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        userModel.getDoctors(function(results) {
            const result = results.filter(doc => doc.username.toLowerCase().includes(req.params.str.toLowerCase()) ||
                doc.specialization.toLowerCase().includes(req.params.str.toLowerCase()) ||
                doc.email.toLowerCase().includes(req.params.str.toLowerCase())
            );
            console.log(result);
            res.render('user/search', { Doctors: result });
        })
    } else {
        res.redirect('/login');
    }

})
router.get('/ambulance', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        ambulanceModel.getAmbulance(function(results) {
            console.log(results);
            res.render('user/ambulance', { Ambulances: results });
        })
    } else {
        res.redirect('/login');
    }

})
router.get('/apptable', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        appointmentModel.getAppointments(function(results) {
            if (results.length > 0) {
                var c = [];
                for (var i = 0; i < results.length; i++) {
                    var app = results;
                    var doc = {};
                    var j = 0;

                    userModel.getDoctorById(results[i].d_Id, function(result) {
                        doc = {
                            name: result[0].username,

                            date: app[j].date,
                            time: app[j].time,
                            status: app[j].status,
                            p_Id: app[j].p_Id,
                            d_Id: result[0].d_Id
                        }
                        console.log(doc.d_Id);
                        c.push(doc);
                        if (j == results.length - 1) {
                            res.render('user/apptable', { app: c });
                        }
                        j++;
                    })
                }
            }
        })
    } else {
        res.redirect('/login');
    }
})
router.get('/myprofile', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        userModel.getById(req.cookies["Id"], function(result) {
            res.render('user/myprofile', { user: result });
        })
    } else {
        res.redirect('/login');
    }

})
router.post('/myprofile', [
    check('username', 'Invalid UserName').exists().isLength({ min: 3 }),
    check('password', 'Invalid Password').exists().isLength({ min: 3 })

], (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log("validation failed");
            const alert = errors.array();
            alert.forEach(myFunction);

            function myFunction(item) {
                console.log(item);
            }
        } else {
            var user = {
                username: req.body.username,
                password: req.body.password,
                id: req.cookies["Id"]
            }
            console.log(user);
            userModel.myProfileUpdate(user, function(status) {
                if (status) {
                    res.redirect('myprofile');
                }
            })
        }
    } else {
        res.redirect('/login');
    }

})
router.get('/membership', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        if (req.cookies["status"] != "Verified") {
            res.redirect('/userdash')
        } else {
            res.render('user/membership')
        }
    } else {
        res.redirect('/login');
    }
})
router.post('/picupload', [
    check('dp', 'Invalid Profile Pic').custom((val, { req }) => {
        if (req.files.dp.mimetype === 'image/jpeg') {
            return true;
        } else {
            return false;
        }
    })
], (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log("validation failed");
            const alert = errors.array();
            alert.forEach(myFunction);

            function myFunction(item) {
                console.log(item);
            }
        } else {

            let fileName = req.files.dp;
            let uploadPath = 'assets/uploads/' + fileName.name;
            var user = {
                userid: req.cookies["Id"],
                uploadPath: uploadPath
            };
            userModel.uploadPicture(user, function(status) {
                if (status) {
                    fileName.mv(uploadPath, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }

                    });
                    res.redirect('myprofile');
                } else {
                    console.log("can not upload");
                }
            });
        }
    } else {
        res.redirect('/login');
    }
});
router.get('/complain', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        var msg = "";
        complainModel.getComplainById(req.cookies['Id'], function(results) {
            if (results.length > 0) {
                console.log(results);
                msg = "complained";
                res.render('user/complain', { msg: msg });
            } else {
                msg = "";
                res.render('user/complain', { msg: msg });
            }
        })
    } else {
        res.redirect('/login');
    }

})
router.post('/complain', [
        check('complain', 'Invalid complain')
        .exists()
        .isLength({ min: 10 })
        .isLength({ max: 100 })
    ],
    (req, res) => {
        if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log("validation failed");
                const alert = errors.array();
                alert.forEach(myFunction);

                function myFunction(item) {
                    console.log(item);
                }
            } else {

                var complain = {
                    details: req.body.complain,
                    u_Id: req.cookies["Id"]
                }
                complainModel.complainInsert(complain, function(status) {
                    if (status) {
                        res.redirect('/userdash');
                    }
                })
            }
        } else {
            res.redirect('/login');
        }

    })
router.get('/lab', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        labModel.labTest(function(results) {
            res.render('user/lab', { tests: results });
        })
    } else {
        res.redirect('/login');
    }

})
router.get('/financial', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        res.render('user/financial');
    } else {
        res.redirect('/login');
    }


})
router.post('/financial', [
        check('financial', 'Invalid complain')
        .exists()
        .isLength({ min: 10 })
        .isLength({ max: 100 })
    ],
    (req, res) => {
        if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log("validation failed");
                const alert = errors.array();
                alert.forEach(myFunction);

                function myFunction(item) {
                    console.log(item);
                }
            } else {
                membershipModel.financeUpdate(req.cookies["Id"], function(status) {
                    if (status) {
                        res.cookie('status', "Verified:Finance");
                        res.redirect('/userdash');
                    }
                })
            }
        } else {
            res.redirect('/login');
        }
    })
router.get('/premium', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        res.render('user/premium');
    } else {
        res.redirect('/login');
    }


})
router.post('/premium', [
        check('tran', 'Invalid tran')
        .exists()
        .isLength({ min: 10 })
    ],
    (req, res) => {
        if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log("validation failed");
                const alert = errors.array();
                alert.forEach(myFunction);

                function myFunction(item) {
                    console.log(item);
                }
            } else {
                membershipModel.premiumUpdate(req.cookies["Id"], function(status) {
                    if (status) {
                        res.cookie('status', "Verified:Premium");
                        res.redirect('/userdash');
                    }

                })


            }
        } else {
            res.redirect('/login');
        }
    })
router.get('/invoice', (req, res) => {
    if (req.cookies["cred"] != null && req.cookies["type"] == "Patient") {
        appointmentModel.getInvoice(req.cookies["Id"], function(results) {
            res.render('user/invoice', { invoices: results });
        })
    } else {
        res.redirect('/login');
    }

})



module.exports = router;