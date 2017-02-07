var express = require('express');
var router = express.Router();
var autoReplayController = require('../controllers/AutoReplyController');
var noticeController = require('../controllers/NoticeController');

//验签用Controller
var signatureController = require('../controllers/SignatureController');

router.post('/weixin/api/auth/ack', autoReplayController.reply);

router.get('/notice', noticeController.renderNoticePage);

//验证消息的确来自微信服务器
router.get('/weixin/api/auth/ack', signatureController.signatureWeixin);

module.exports = router;
