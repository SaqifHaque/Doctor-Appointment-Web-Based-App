var db = require('./db');

module.exports = {

	validate: function (user, callback) {
		var sql = "SELECT * FROM admininfo where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function (results) {
			if (results.length > 0) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	getByUname: function (username, callback) {
		var sql = "select * from admininfo where username=?";
		db.getResults(sql, [username], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	updateProfile: function (user, callback) {
		var sql = "update admininfo set name=?, username=?, password=?, email=?,phone=? where username=?";
		db.execute(sql, [user.name, user.username, user.password, user.email, user.phone, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	assignDoctor: function (user, callback) {
		var sql = "update doctorinfo set dept=?, post=? where username=?";
		db.execute(sql, [user.dept, user.post, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	insert: function (user, callback) {
		console.log(user);
		var sql = "insert into doctorinfo values(?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [user.fname, user.lname, user.username, user.password, user.email, user.phone, null, null, user.fathersName, user.nid, 'unblock'], function (status) {
			if (status) {
				console.log(user);
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	getAllDoctor: function (callback) {
		var sql = "select * from doctorinfo";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllReceptionist: function (callback) {
		var sql = "select * from receptionistinfo";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllPatient: function (callback) {
		var sql = "select * from patientinfo";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},

	getDoctorProfile: function (username, callback) {
		var sql = "select * from doctorinfo where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getPatientProfile: function (username, callback) {
		var sql = "select * from patientinfo where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getReceptionistProfile: function (username, callback) {
		var sql = "select * from receptionistinfo where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getAllPendingPatient: function (callback) {
		var sql = "select * from patientinfo where type=?";
		db.getResults(sql, ['pending'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllPendingReceptionist: function (callback) {
		var sql = "select * from receptionistinfo where type=?";
		db.getResults(sql, ['pending'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailableReceptionist: function (callback) {
		var sql = "select * from receptionistinfo where type=?";
		db.getResults(sql, ['available'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailablePatient: function (callback) {
		var sql = "select * from patientinfo where type=?";
		db.getResults(sql, ['available'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailableSlot: function (callback) {
		var sql = "select * from slotinfo where status=?";
		db.getResults(sql, ['available'], function (results) {
			console.log("caught");
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllBookedSlot: function (callback) {
		var sql = "select * from slotinfo where status=?";
		db.getResults(sql, ['booked'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	deleteslot: function (id, callback) {
		var sql = "delete from slotinfo where houseid=?";
		db.execute(sql, [id], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
receptionistStatus: function (user, callback) {
		var sql = "update receptionistinfo set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	patientStatus: function (user, callback) {
		var sql = "update patientinfo set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	doctorStatus: function (user, callback) {
		var sql = "update doctorinfo set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	deleteDoctor: function (username, callback) {
		var sql = "delete from doctorinfo where username=?";
		db.execute(sql, [username], function (status) {
			if (status) {
				console.log(user);
				callback(true);
			} else {
				callback(false);
			}
		});
	}
}