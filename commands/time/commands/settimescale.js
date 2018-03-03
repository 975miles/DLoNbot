var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Sets the timescale",
	"a":["timescale in days/day"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		//oof template
		return bal;
	}
}
