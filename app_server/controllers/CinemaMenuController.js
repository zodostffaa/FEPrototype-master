/**
 * Created by Administrator on 2017/2/8.
 */
var cinemaMenuModel = require('../models/CinemaMenuModel');
module.exports = {
    /**
     * 自定菜单---影吧
     */
    getCinemaInfo: function (req, res) {
        cinemaMenuModel.getCinemaInfoModel(req, res);
    },
    //无限滚动测试---获取影吧信息
    getCinemaInfoDemo: function (req, res) {
        cinemaMenuModel.getCinemaInfoLimitModel(req, res);
    }

}
