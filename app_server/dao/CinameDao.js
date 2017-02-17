/**
 * Created by Administrator on 2017/2/9.
 */
var toUTF8 = require('./ToUTF8');
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');

module.exports = {
    getCinema :function (totalPage,callBack){
        pool.getPoolConnection('gdas', function (err, connection) {

            if (err) {
                console.log('get connection from pool failed in getCiname: ', err);
                return;
            }

            var sql = 'SELECT ac.* from app_cinema as ac ORDER BY ac.cinema_id LIMIT ?,5';

            connection.query(sql, [totalPage*5],function (queryErr, rows) {
                if (queryErr) {
                    console.log('select * from app_cinema failed: ', err);
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
            });

        });
    },
    findCountByPage : function(callBack){
        pool.getPoolConnection('gdas', function (err, connection) {

            if (err) {
                console.log('get connection from pool failed in findCountByPage: ', err);
                return;
            }

            var sql = 'SELECT count(*) as count from app_cinema as ac';

            connection.query(sql, function (queryErr, result) {
                if (queryErr) {
                    console.log('select * from app_cinema failed: ', err);
                    callBack({
                        isSuccess: false
                    });
                } else {
                    callBack({
                        isSuccess: true,
                        result: result
                    })
                }
                connection.release();
            });

        });
    }


}

