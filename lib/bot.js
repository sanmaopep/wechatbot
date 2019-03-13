var wechaty = require('wechaty');
var logger = require('./logger');
var renderQrcode = require('./qrcode');

var keyword = document.getElementById('keyword');
var response = document.getElementById('response');
var fromRoom = document.getElementById('fromRoom');

var Wechaty = wechaty.Wechaty;

var bot = new Wechaty({})
	.on('scan', function (qrcode) {
		renderQrcode(qrcode);
		logger.log('2017以后注册的微信账号可能无法登陆，请在 https://wx.qq.com 上检测能否登陆')
		logger.log('显示二维码成功，请微信扫描登录');
	})
	.on('login', function (user) {
		logger.log('登录成功，用户：' + user);
		renderQrcode('');
	})
	.on('logout', function () {
		logger.log('账号已登出');
	})
	.on('message', async function (msg) {
		const contact = msg.from();
		const text = msg.text();
		const room = msg.room();
		if (!keyword.value) {
			logger.log('请输入关键词')
			return
		}
		if (room && fromRoom.value) {
			const topic = await room.topic()
			if (text.indexOf(keyword.value) !== -1) {
				logger.log(`来自房间: ${topic} 
				用户: ${contact.name()} 
				信息: ${text} 
				包含关键词：${keyword.value}`)
				room.say(response.value)
			}
		} else if (!fromRoom.value) {
			if (text.indexOf(keyword.value) !== -1) {
				logger.log(`来自联系人: ${contact.name()} 
				信息: ${text} 
				包含关键词：${keyword.value}`)
				contact.say(response.value)
			}
		}
	})
	.start()
	.catch(e => {
		logger.log('程序错误，错误信息：' + e.message)
		logger.log('请重新启动....')
		bot.stop()
	})
