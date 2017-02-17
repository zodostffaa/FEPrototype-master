var config = require('../../config');
var noticeDao = require('../dao/NoticeDao');
var uDataLogger = require('../../common/Logger/Logger');
var OAuth = require('wechat-oauth');
var jsapiTicketController = require('./JsapiTicketController');
var sign = require('../../common/utils/sign.js');
var cinemaMenuModel = require('../models/CinemaMenuModel');
var client = new OAuth(config.app.appid, config.app.appsecret);


var queryConfig = function (callback, req) {
    var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
    var ret = sign(jsapiTicketController.getJsapiTicket(), url);
    console.log(ret);
    callback(ret);
};

module.exports = {
    /**
     * 自定菜单---影吧
     */
    getCinemaInfo: function (req, res) {
        res.render('cinema');
    },
    //无限滚动测试---获取影吧信息
    getCinemaInfoDemo: function (req, res) {
        cinemaMenuModel.getCinemaInfoLimitModel(req, res);
    }


}
