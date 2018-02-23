var bal = require("../bal.json");

module.exports = function (checking) {
	for (var i in bal.translation) {
		if (bal.translation[i].name == checking) {
			return true;
		}
	}
	return false;
}