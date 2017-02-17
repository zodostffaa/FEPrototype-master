/**
 * Created by fupeng on 17/2/17.
 */

var movielibDao = require('../dao/MovielibDao');


module.exports = {

    /**
     * @param req
     * @param res
     * http -- post -- ajax
     * rout:cinemaDetail
     */
    getMovielibInfoModel: function (req, res) {
        var cinemaid = req.query.cinemaid; //影吧id
        movielibDao.getMovieInfo( function(data) {
            if (data.isSuccess) {
                res.render('movielib', {
                    layout: false,
                    message: 'success',
                    status: 'success',
                    location: data.rows[0]
                });
            } else {
                res.render('location', {
                    layout: false,
                    message: 'fail',
                    status: 'fail'
                });
            }
        })
    }
}