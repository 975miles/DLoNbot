var bal = require("../bal.json");

module.exports = function (site) {
	for (var i in bal.internet.sites) {
		if (bal.internet.sites[i].name == site) {
			return i;
		}
	}
}