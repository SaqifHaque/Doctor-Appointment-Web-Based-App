const db = require('./db');

module.exports = {

    insert: function(app, callback) {
        var sql = "insert into appointments VALUES ('', '" + app.date + "' , '" + app.time + "' ,'" + app.status + "', '" + app.d_Id + "', '" + app.u_Id + "', '" + app.p_Id + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    insertInvoice: function(inv, callback) {
        var sql = "insert into invoices VALUES ('', '" + inv.total + "','" + inv.transaction + "''" + inv.status + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    getAppointments: function(callback) {
        var sql = "select * from appointments";

        db.getResults(sql, function(results) {
            callback(results);
        });
    }
}