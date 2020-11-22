const db = require('./db');

module.exports = {

    labTest: function(callback) {
        var sql = "select * from labtests";
        db.getResults(sql, function(results) {
            callback(results);
        });

    }
}