const db = require('./db');

module.exports = {

    getNotice: function(callback) {
        var sql = "select * from notices";
        db.getResults(sql, function(results) {
            callback(results);
        });

    }
}