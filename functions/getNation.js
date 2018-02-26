var bal = require("../bal.json");

module.exports = function (user) {
	for (var i in bal.nations) {
		if (bal.nations[i].owner == user) {
			return i;
		}
	}
}
