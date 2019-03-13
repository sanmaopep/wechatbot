var renderQrcode = require('./qrcode');
var initEncrption = require('./encryption')
var logger = require('./logger')

// 主函数
module.exports = function Main() {
	logger.log('系统已启动');
	document.getElementById('Main').style.display = 'none';

	initEncrption();

}
