var bal = require("../bal.json");

module.exports = function (owner) {
	for (var i in bal.translation) {
		if (bal.translation[i].name == owner) {
			return i;
		}
	}
	return("Absolutely nobody");
}