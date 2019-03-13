var Log = document.getElementById('Log');

module.exports = {
	log: function (text) {
		Log.innerHTML += text + '<br />';
	}
}
