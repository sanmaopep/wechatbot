var QRCode = require('qrcode')
var canvas = document.getElementById('qrcode')

module.exports = function (qrcodeText) {
	QRCode.toCanvas(canvas, qrcodeText, function (error) {
		if (error) console.error(error);
		console.log('qrcode render success');
	})
}
