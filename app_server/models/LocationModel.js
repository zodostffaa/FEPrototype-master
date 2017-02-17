
var locationDao = require('../dao/LocationDao');


module.exports = {

    /**
     * @param req
     * @param res
     * http -- post -- ajax
     * rout:cinemaDetail
     */
    getLocationInfoModel: function (req, res) {
        var cinemaid = req.query.cinemaid; //影吧id
        locationDao.getLocation( function(data) {
            if (data.isSuccess) {
                res.render('location', {
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