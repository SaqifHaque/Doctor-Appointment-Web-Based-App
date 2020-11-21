var db = require('./db');

module.exports = {

	validate: function (user, callback) {
		var sql = "SELECT * FROM users where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function (results) {
			if (results.length > 0) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	getByUname: function (username, callback) {
		var sql = "select * from users  where username=?";
		db.getResults(sql, [username], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	updateProfile: function (user, callback) {
		var sql = "update users set username=?, password=?, email=?,phonenumber=? where username=?";
		db.execute(sql, [user.username, user.password, user.email, user.phonenumber], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	assignDoctor: function (user, callback) {
		var sql = "update doctor_info set qualification=? specialization=? where d_Id=?";
		db.execute(sql, [user. qualification,user. specialization, user.d_Id], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	insert: function (user, callback) {
		console.log(user);
		var sql =('', '" + user.username + "' , '" + user.email + "' ,'" + user.bloodgroup + "', '" + user.phone + "','" + user.password + "', '" + user.profilepic + "' ,'" + user.type + "' , '" + user.status + "','" + user.gender + "');
		db.execute(sql,function (status) {
			callback(status);
		});
	},
	getAllDoctor: function (callback) {
		var sql = "select * from users ";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllReceptionist: function (callback) {
		var sql = "select * from users ";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllPatient: function (callback) {
		var sql = "select * from users ";
		db.getResults(sql, [], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},

	getDoctorProfile: function (username, callback) {
		var sql = "select * from users  where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getPatientProfile: function (username, callback) {
		var sql = "select * from users where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getReceptionistProfile: function (username, callback) {
		var sql = "select * from users  where username=?";
		db.getResults(sql, username, function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	getAllPendingPatient: function (callback) {
		var sql = "select * from users  where type=?";
		db.getResults(sql, ['pending'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllPendingReceptionist: function (callback) {
		var sql = "select * from users  where type=?";
		db.getResults(sql, ['pending'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailableReceptionist: function (callback) {
		var sql = "select * from users where type=?";
		db.getResults(sql, ['available'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailablePatient: function (callback) {
		var sql = "select * from users where type=?";
		db.getResults(sql, ['available'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	getAllAvailableSlot: function (callback) {
		var sql = "select * from users where status=?";
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
		var sql = "select * from users where status=?";
		db.getResults(sql, ['booked'], function (results) {
			if (results.length > 0) {
				callback(results);
			} else {
				callback([]);
			}
		});
	},
	deleteslot: function (id, callback) {
		var sql = "delete from users where slotid=?";
		db.execute(sql, [id], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
receptionistStatus: function (user, callback) {
		var sql = "update users  set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	patientStatus: function (user, callback) {
		var sql = "update users  set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	doctorStatus: function (user, callback) {
		var sql = "update users  set status=? where username=?";
		db.execute(sql, [user.status, user.username], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	/*deleteDoctor: function (username, callback) {
		var sql = "delete from users  where username=?";
		db.execute(sql, [username], function (status) {
			if (status) {
				console.log(user);
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	*/
	delete: function(id, callback) {
		var sql = "delete from user where id = '" + id + "'";
        console.log(sql);

        db.execute(sql, function(status) {
            callback(status);
        });
    },
}