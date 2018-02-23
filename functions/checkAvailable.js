var bal = require("../bal.json");

module.exports = function (checking) {
	for (var i in bal.internet.sites) {
		if (bal.internet.sites[i].name == checking) {
			return false;
		}
	}
	return true;
}