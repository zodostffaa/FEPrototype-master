var express = require('express');
var router = express.Router();
var autoReplayController = require('../controllers/AutoReplyController');
var noticeController = require('../controllers/NoticeController');
var scanbrcodeController = require('../controllers/ScanbrcodeController');
var oauthController = require('../controllers/OauthController');
var cinemaMenuController = require('../controllers/CinemaMenuController');

//验签用Controller
var signatureController = require('../controllers/SignatureController');

//scan Controller
var scanController = require('../controllers/ScanController');

var cinemaDetailController = require('../controllers/CinemaDetailController');

var locationController = require('../controllers/LocationController');

var movielibController = require('../controllers/MovielibController');

//微信自动回复
router.post('/weixin/api/auth/ack', autoReplayController.reply);
//验证消息的确来自微信服务器
router.get('/weixin/api/auth/ack', signatureController.signatureWeixin);


router.get('/notice', noticeController.renderNoticePage);

//测试oauth base
router.get('/oauth', oauthController.getOauth);

//测试oauth userinfo
router.get('/userinfo', oauthController.getUserInfo);

//微信绑定影厅扫码页面
router.get('/scan', scanController.setConfig);
//微信绑定影厅扫码页面，验证以及自动发送推送消息
router.post('/scanauth', scanController.sendTextMsg);

router.get('/cinema',cinemaMenuController.getCinemaInfo);
router.post('/cinema',cinemaMenuController.getCinemaInfoDemo);

router.get('/cinemadetail',cinemaDetailController.getCinemaDetail);

router.get('/location',locationController.getLocation);

router.get('/movielib',movielibController.getMovielib);

module.exports = router;
