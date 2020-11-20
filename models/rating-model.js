const db = require('./db');

module.exports = {

    getById: function(id, callback) {
        var sql = "select * from ratings JOIN users on ratings.u_Id = users.id where ratings.d_Id= '" + id + "'";
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    insert: function(rating, callback) {
        var sql = "insert into ratings VALUES ('', '" + rating.rating + "' , '" + rating.review + "' ,'" + rating.d_Id + "', '" + rating.u_Id + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    }

}