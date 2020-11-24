const db = require('./db');

module.exports = {

    validate: function(user, callback) {
        var sql = "select * from users where email='" + user.email + "' and password='" + user.password + "'";
        db.getResults(sql, function(results) {
            if (results.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    getById: function(id, callback) {
        var sql = "select * from users where id= '" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    getAll: function(callback) {
        // var sql = "select * from user";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    insert: function(user, callback) {
        var pic = "https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg";
        var sql = "insert into users VALUES ('', '" + user.username + "' , '" + user.email + "' ,'" + user.bloodgroup + "', '" + user.phone + "','" + user.password + "', '" + pic + "' ,'" + user.type + "' , '" + user.status + "','" + user.gender + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    update: function(user, callback) {
        // var sql = "update user set username = '" + user.username + "',password='" + user.password + "' , type='" + user.type + "' where id='" + user.id + "'";

        //console.log(sql);

        db.execute(sql, function(status) {
            callback(status);
        });

    },
    delete: function(id, callback) {
        // var sql = "delete from user where id = '" + id + "'";

        //console.log(sql);

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    verifyUser: function(email, callback) {
        var verified = "Verified";
        var sql = "update users set status='" + verified + "' where email='" + email + "'";
        db.execute(sql, function(status) {
            callback(status);
        });
    },
    getByEmail: function(email, callback) {
        var sql = "select * from users where email= '" + email + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    getByType: function(type, callback) {
        var sql = "select * from users where type= '" + type + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });
    },
    getDoctors: function(callback) {
        var sql = "select * from doctor_info JOIN users on doctor_info.u_Id=users.id";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    getDoctorById: function(id, callback) {
        var sql = "select * from doctor_info JOIN users on doctor_info.u_Id=users.id where doctor_info.d_Id='" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    uploadPicture: function(user, callback) {
        var sql = "update users set profilepic = '" + user.uploadPath + "' where id = '" + user.userid + "' ";
        db.execute(sql, function(status) {
            callback(status);
        });
    },
    myProfileUpdate: function(user, callback) {
        var sql = "update users set username = '" + user.username + "',password='" + user.password + "' where id='" + user.id + "'";
        db.execute(sql, function(status) {
            callback(status);
        });
    }



}