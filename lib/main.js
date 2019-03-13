var logger = require('./logger')

// 初始化模块
require('./encryption')

// 主函数
module.exports = function Main() {
	logger.log('系统已启动');
	// document.getElementById('Main').style.display = 'none';
	require('./bot')

}
