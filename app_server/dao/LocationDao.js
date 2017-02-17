/**
 * Created by fupeng on 17/2/16.
 */
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');


module.exports.getLocation = function (callBack) {
    pool.getPoolConnection('mtsc2', function (err, connection) {
        if (err) {
            console.log('Error: get connection from pool in getCineamDetail: ', err);
            return;
        }

        var sql = 'SELECT * FROM app_cinema';

        connection.query(sql ,function (queryErr, rows) {
            if (queryErr) {
                console.log('select cinema from app_cinema failed: ', err);
                callBack({
                    isSuccess: false
                });
            } else {
                callBack({
                    isSuccess: true,
                    rows: rows
                })
            }
            connection.release();
        })
    })
};

