var config = require('../../config');
var jsapiTicketController = require('./JsapiTicketController');
var sign = require('../../common/utils/sign.js');
var logger = require('../../common/Logger/Logger');

var queryConfig = function (callback, req) {
    var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
    var ret = sign(jsapiTicketController.getJsapiTicket(), url);
    console.log(ret);
    callback(ret);
};

module.exports.setConfig = function (req, res) {
    queryConfig(function (ret) {
        res.render('cinema', {
            title: '影吧',
            layout: 'index',
            sign_pkg: ret.jsapi_ticket,
            appId: config.app.appid,
            timestamp: ret.timestamp,
            nonceStr: ret.nonceStr,
            signature: ret.signature,
            open_id: '11'          //待定

        });
    }, req);
};
