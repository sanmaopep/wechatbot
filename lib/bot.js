var Wechat = require('wechat4u')
var logger = require('./logger');
var renderQrcode = require('./qrcode');

var keyword = document.getElementById('keyword');
var response = document.getElementById('response');
var avatar = document.getElementById('userAvatar');
var relogin = document.getElementById('relogin');

try {
	var bot = new Wechat();

	bot.on('uuid', function (uuid) {
		renderQrcode('https://login.weixin.qq.com/l/' + uuid);
		logger.log('2017以后注册的微信账号可能无法登陆，请在 https://wx.qq.com 上检测能否登陆')
		logger.log('显示二维码成功，请微信扫描登录');
	});

	bot.on('user-avatar', function (dataUrl) {
		avatar.src = dataUrl;
	});

	bot.on('login', function (user) {
		logger.log('登录成功' + user);
		relogin.style.display = 'inline';
	});

	bot.on('logout', function () {
		logger.log('退出登录成功');
		avatar.src = '';
		bot.start();
	});


	bot.on('message', function (msg) {
		if (!keyword.value || !response.value) {
			logger.log('你未输入关键词或回复, 请输入关键词');
		}
		if (msg.Content.indexOf(keyword.value) !== -1) {
			logger.log('检测到关键词，开始自动回复' + keyword);
			logger.log('来自用户' + msg.getPeerUserName());
			logger.log('内容为：' + msg.Content);
			logger.log('---------------------------------------');
			bot.sendText(response.value, msg.getPeerUserName());
		}
	});

	bot.start();

	relogin.addEventListener('click', function () {
		bot.stop();
		relogin.style.display = 'none';
	});

} catch (e) {
	logger.log('未知错误' + JSON.stringify(e))
}
