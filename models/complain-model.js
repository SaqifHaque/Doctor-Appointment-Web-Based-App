const db = require('./db');

module.exports = {

    complainInsert: function(callback) {
        var sql = "";
        db.execute(sql, function(status) {
            callback(status);
        });

    }
}