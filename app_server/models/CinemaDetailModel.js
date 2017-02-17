/**
 * Created by fupeng on 17/2/16.
 */
/**
 * Created by Administrator on 2017/2/13.
 */
var cinemaDetailDao = require('../dao/CinemaDetailDao');


module.exports = {

    /**
     * @param req
     * @param res
     * http -- post -- ajax
     * rout:cinemaDetail
     */
    getCinemaDetailInfoModel: function (req, res) {
        var cinemaid = req.query.cinemaid; //影吧id
        cinemaDetailDao.getCinemaDetail( cinemaid , function(data) {
            if (data.isSuccess) {
                res.render('cinemadetail', {
                    layout: false,
                    message: 'success',
                    status: 'success',
                    cinemaDetail: data.rows[0]
                });
            } else {
                res.render('cinemadetail', {
                    layout: false,
                    message: 'fail',
                    status: 'fail'
                });
            }
        })
    }

}


