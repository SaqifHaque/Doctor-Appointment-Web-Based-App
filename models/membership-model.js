const db = require('./db');

module.exports = {

    financeUpdate: function(id, callback) {
        var finance = "Verfied:Finance";
        var sql = "update users set status = '" + finance + "' where id='" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    premiumUpdate: function(id, callback) {
        var finance = "Verfied:Premium";
        var sql = "update users set status = '" + finance + "' where id='" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
}