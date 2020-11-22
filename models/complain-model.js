const db = require('./db');

module.exports = {

    complainInsert: function(complain, callback) {
        var sql = "insert into complains VALUES ('', '" + complain.details + "' , '" + complain.u_Id + "')";;
        db.execute(sql, function(status) {
            callback(status);
        });

    },
    getComplainById: function(id, callback) {
        var sql = "select * from complains where u_Id= '" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
}