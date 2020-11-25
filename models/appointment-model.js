const db = require('./db');

module.exports = {

    insert: function(app, callback) {
        var sql = "insert into appointments VALUES ('', '" + app.date + "' , '" + app.time + "' ,'" + app.status + "', '" + app.d_Id + "', '" + app.u_Id + "', '" + app.p_Id + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    insertInvoice: function(inv, callback) {
        var sql = "insert into invoices VALUES ('', '" + inv.total + "','" + inv.transaction + "','" + inv.date + "','" + inv.status + "','" + inv.u_Id + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
    getAppointments: function(id, callback) {
        var sql = "select * from appointments where u_Id='" + id + "'";

        db.getResults(sql, function(results) {
            callback(results);
        });
    },
    getPrescriptionById: function(id, callback) {
        var sql = "select * from prescriptions where p_Id = '" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });
    },
    getInvoice: function(id, callback) {
        var sql = "select * from invoices where u_Id = '" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });
    },
    cancel: function(id, callback) {
        var cancel = "canceled";
        var sql = "update appointments set status = '" + cancel + "' where ap_Id='" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });
    },

}