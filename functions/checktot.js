var bal = require("../bal.json");

module.exports = function (guild) {
	var tot = 0;
	for (i in bal.currency[guild].bank){
		tot += bal.currency[guild].bank[i].bal;
	}
	return tot;
}