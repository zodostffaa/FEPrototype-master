var config = require('../../config');
var OAuth = require('wechat-oauth');
var jsapiTicketController = require('./JsapiTicketController');
var sign = require('../../common/utils/sign.js');
var logger = require('../../common/Logger/Logger');

var client = new OAuth(config.app.appid, config.app.appsecret);

var queryConfig = function (callback, req) {
    var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
    var ret = sign(jsapiTicketController.getJsapiTicket(), url);
    console.log(ret);
    callback(ret);
};

module.exports.setConfig = function (req, res) {
    client.getAccessToken(req.query.code, function (err, result) {
        //var accessToken = result.data.access_token;
        var openid = result.data.openid;
        if(openid ==null){
            res.render('error');
        }
        queryConfig(function (ret) {
            res.render('scan', {
                title: '请扫码绑定影厅',
                sign_pkg: ret.jsapi_ticket,
                appId: config.app.appid,
                timestamp: ret.timestamp,
                nonceStr: ret.nonceStr,
                signature: ret.signature,
                open_id: openid
            });
        }, req);
    });

};
