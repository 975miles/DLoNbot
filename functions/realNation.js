var bal = require("../bal.json");

module.exports = function (checking) {
	for (var i in bal.nations) {
		if (bal.nations[i].name == checking) {
			return true;
		}
	}
	return false;
}
