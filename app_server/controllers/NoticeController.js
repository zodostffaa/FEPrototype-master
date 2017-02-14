var config = require('../../config');
var noticeDao = require('../dao/NoticeDao');
var uDataLogger = require('../../common/Logger/Logger');

var queryNotice = function (callback, req) {
    noticeDao.getNoticeList(function (data) {
        if(data.isSuccess){
            callback(data.notices);
        }else{
            console.log('Err: query notice from notice dao: ', data.err);
        }
    });
};

module.exports.renderNoticePage = function (req, res) {
    queryNotice(function (notices) {
        res.render('notice', {
            title: '公告',
            notices: '123'
        });
    }, req);
};

module.exports.queryNotice = queryNotice;