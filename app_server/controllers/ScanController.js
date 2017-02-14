var config = require('../../config');
var wechatAPI = require('wechat-api');
var accessTokenController = require('./AccessTokenController');
var logger = require('../../common/Logger/Logger');





var api = new wechatAPI(config.app.appid, config.app.appsecret, function (callback) {
    // 传入一个获取全局token的方法
    var accessToken = accessTokenController.getAccessToken();
    if (!accessToken) {return callback(err);}
    callback(null, JSON.parse(accessToken));

});

module.exports.setConfig = function (callback, req) {
    var param = {
        debug: false,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        url: 'http://www.xxx.com'
    };
    api.getJsConfig(param, callback);
};
