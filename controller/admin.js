var express = require('express');
var router = express.Router();
var adminModel = require.main.require('./models/admin-model');
router.get('*', function (req, res, next) {
	if (req.cookies['uname'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});
router.get('/', function (req, res) {
	adminModel.getByUname(req.cookies['uname'], function (result) {
		res.render('admin/index', {
			user: result
		});
	});
});

router.get('/profile', function (req, res) {
	adminModel.getByUname(req.cookies['uname'], function (result) {
		res.render('admin/profile', {
			user: result
		});
	});

});

router.post('/profile', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			name: req.body.name,
			username: req.body.uname,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
		};

		adminModel.updateProfile(user, function (status) {
			if (status) {
				res.redirect('/admin');
			} else {
				res.redirect('/admin/profile');
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/addNewDoctor', function (req, res) {
	var user = {
		fname: '',
		lname: '',
		username: '',
		email: '',
		phone: '',
		password: '',
		fathersName: '',
		nid: ''
	};
	res.render('admin/addNewDoctor', {
		user: user
	});

});
router.post('/addNewDoctor', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			username: req.body.uname,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
			fathersName: req.body.fathersName,
			nid: req.body.nid
		};
		adminModel.insert(user, function (status) {
			if (status) {
				res.redirect('/admin/view_Doctor');
			} else {
				res.render('admin/addNewDoctor', {
					user: user
				});
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/view_Doctor', function (req, res) {
	adminModel.getAllDoctor(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Doctor', {
				userlist: results
			});
		} else {
			res.render('admin/view_Doctor', {
				userlist: results
			});
		}
	});

});
router.get('/view_Receptionist', function (req, res) {
	adminModel.getAllReceptionist(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Receptionist', {
				userlist: results
			});
		} else {
			res.render('admin/view_Receptionist', {
				userlist: results
			});
		}
	});

});
router.get('/view_Patient', function (req, res) {
	adminModel.getAllPatient(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Patient', {
				userlist: results
			});
		} else {
			res.render('admin/view_Patient', {
				userlist: results
			});
		}
	});

});

router.get('/view_Receptionist/:username', function (req, res) {
	adminModel.getReceptionistProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'receptionistinfo'
		});
	});

});
router.get('/view_Doctor/:username', function (req, res) {
	adminModel.getDoctorProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'doctorinfo'
		});
	});

});

router.get('/view_Patient/:username', function (req, res) {
	adminModel.getPatientProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'patientinfo'
		});
	});

});
//block unblock
router.get('/doctorinfo/:username', function (req, res) {
	adminModel.getDoctorProfile(req.params.username, function (result) {
		if (result.status == "block") {
			var user = {
				username: req.params.username,
				status: 'unblock'
			};
		} else {
			var user = {
				username: req.params.username,
				status: 'block'
			};
		}
		adminModel.doctorStatus(user, function (status) {
			if (status) {
				adminModel.getDoctorProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
						user: result,
						table: 'doctorinfo'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
router.get('/receptionistinfo/:username', function (req, res) {
	adminModel.getReceptionistProfile(req.params.username, function (result) {
		if (result.status == "block") {
			var user = {
				username: req.params.username,
				status: 'unblock'
			};
		} else {
			var user = {
				username: req.params.username,
				status: 'block'
			};
		}
		adminModel.receptionistStatus(user, function (status) {
			if (status) {
				adminModel.getreceptionistProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
						user: result,
						table: 'receptionistinfo'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
router.get('/patientinfo/:username', function (req, res) {
	adminModel.getPatientProfile(req.params.username, function (result) {
		if (result.status == "block") {
			var user = {
				username: req.params.username,
				status: 'unblock'
			};
		} else {
			var user = {
				username: req.params.username,
				status: 'block'
			};
		}
		adminModel.patientStatus(user, function (status) {
			if (status) {
				adminModel.getPatientProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
						user: result,
						table: 'patientinfo'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
router.get('/view_Available', function (req, res) {
	adminModel.getAllAvailableSlot(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Available', {
				userlist: results
			});
		} else {
			res.render('admin/view_Available', {
				userlist: results
			});
		}
	});

});
router.get('/view_Booked', function (req, res) {
	adminModel.getAllBookedSlot(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Booked', {
				userlist: results
			});
		} else {
			res.render('admin/view_Booked', {
				userlist: results
			});
		}
	});

});
router.get('/assignDoctor', function (req, res) {
	adminModel.getAllDoctor(function (results) {
		if (results.length > 0) {
			res.render('admin/assignDoctor', {
				userlist: results
			});
		} else {
			res.render('admin/assignDoctor', {
				userlist: results
			});
		}
	});

});
router.post('/assignDoctor', function (req, res) {
	var user = {
		username: req.body.username,
		dept: req.body.dept,
		post: req.body.post,
	};

	adminModel.assignDoctor(user, function (status) {
		if (status) {
			res.render('admin/view_Doctor');
		} else {
			res.redirect('/admin/assignDoctor');
		}
	});
});

router.get('/changeDoctor', function (req, res) {
	res.render('admin/changeDoctor');

});
router.get('/view_Booked', function (req, res) {
	res.render('admin/view_Booked');

});
/*router.get('/removeDoctor', function (req, res) {

	res.render('admin/removeDoctor', {
		user: user
	});

});
router.post('/removeDoctor:username', function (req, res) {

		adminModel.delete(user, function (status) {
			if (status) {
				res.render('/admin/removeDoctor');
			} else {
				res.redirect('admin/view_Doctor', {
					user: user
				});
			}
		});
	});
	*/
	router.get('/removeDoctor', function(req,res){
		res.render('/admin/view_Doctor');
	
});
router.post('/removeDoctor:username',function(req,res)
{
	adminModel.delete(user, function (status) {
		if (status) {
			res.render('/admin/view_Doctor');
		} else {
			res.redirect('admin/view_Doctor', {
				user: user
			});
		}
});
});



module.exports = router;