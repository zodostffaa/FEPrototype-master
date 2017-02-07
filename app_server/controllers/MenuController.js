var config = require('../../config');
var accessTokenController = require('./AccessTokenController');
var request = require('request');

module.exports.customMenu = function (callback, req) {
    var accessToken = accessTokenController.getAccessToken();
    console.log('\n\naccessToken    '+accessToken + '\n\n');
    // console.log('ready to customMenu, accessToken is : ' + accessToken);
    request({
        url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + accessToken,
        method: 'POST',
        json: {
            "button": [
                {
                    "type": "view",
                    "name": "影吧",
                    "url": "http://www.baidu.com/"
                },
                {
                    "type": "view",
                    "name": "影片",
                    "url": "http://192.168.1.243:8081/maven/"
                },
                {
                    "name": "我",
                    "sub_button": [
                        {
                            "type": "view",
                            "name": "会员信息",
                            "url": "http://v.qq.com/"
                        },
                        {
                            "type": "view",
                            "name": "绑定影厅",
                            "url": "http://v.qq.com/"
                        }
                    ]
                }
            ]
        }
    }, function (err, response, body) {
        if(err){
            console.log('customMenu 请求失败');
            return;
        }
        console.log('customMenu 请求成功： ', body);
        callback();
    })
};