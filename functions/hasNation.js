var bal = require("../bal.json");

module.exports = function (checking) {
	for (var i in bal.nations) {
		if (i.owner == checking) {
			return true;
		}
	}
	return false;
}
