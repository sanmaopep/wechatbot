var wechaty = require('wechaty');
var logger = require('./logger');
var renderQrcode = require('./qrcode');

var Wechaty = wechaty.Wechaty;

Wechaty.instance()
	.on('scan', function (qrcode) {
		logger.log('获取二维码中');
		renderQrcode(qrcode);
		logger.log('显示二维码成功，请微信扫描登录');
	})
	.on('login', function (user) {
		logger.log('登录成功，用户：' + user);
		renderQrcode('');
	})
	.on('message', function (message) {
		logger.log('获得消息：' + message);
	})
	.start()
