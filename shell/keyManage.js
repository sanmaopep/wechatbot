var sjcl = require('sjcl');

module.exports = {
	encrypt: encrypt,
	decrypt: decrypt
};

var PASSWORD = "123456Hjkl";
var CHECK_MSG = "wechatbot";

function encrypt(expired, keyNum) {
	var encryptionTexts = [];
	for (var i = 0; i < keyNum; i++) {
		encryptionTexts.push(sjcl.encrypt(PASSWORD, JSON.stringify({
			msg: CHECK_MSG,
			expired: expired,
			random: Math.random()
		})))
	}
	return encryptionTexts;
}

function decrypt(encryptionText) {
	var json, text;
	try {
		text = sjcl.decrypt(PASSWORD, encryptionText);
		json = JSON.parse(text);
	} catch (e) {
		return {
			msg: '密钥解析错误',
			res: false
		}
	}
	// MSG
	if (json.msg !== CHECK_MSG) {
		return {
			msg: '密钥内含信息错误',
			res: false
		}
	}
	// 过期检查
	if (new Date() > new Date(json.expired)) {
		return {
			msg: '密钥已过期，密钥过期时间：' + json.expired,
			res: false
		}
	}

	return {
		msg: '密钥验证通过，密钥过期时间：' + json.expired,
		res: true
	}
}
