var keyManage = require('../shell/keyManage')
var logger = require('./logger')

var code = document.getElementById('encryption_code'),
	confirm = document.getElementById('encryption_confirm'),
	message = document.getElementById('encryption_message');

confirm.addEventListener('click', function () {
	var json = keyManage.decrypt(code.value);
	message.innerText = json.msg;

	if (json.res) {
		document.getElementById('Main').style.display = 'block';
		logger.log(json.msg);
	}
});
