const db = require('./db');

module.exports = {

    labTest: function(id, callback) {
        var sql = "select * from labtests where u_Id='" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    }
}