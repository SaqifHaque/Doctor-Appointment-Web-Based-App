const db = require('./db');

module.exports = {

    getAmbulance: function(callback) {
        var sql = "select * from ambulances";
        db.getResults(sql, function(results) {
            callback(results);
        });

    }
}