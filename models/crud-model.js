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
        // var sql = "select * from user where id= '" + id + "'";
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
        var sql = "insert into users VALUES ('', '" + user.username + "' , '" + user.email + "' ,'" + user.bloodgroup + "', '" + user.phone + "','" + user.password + "', '" + user.profilepic + "' ,'" + user.type + "' , '" + user.status + "','" + user.gender + "')";

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
    }
}