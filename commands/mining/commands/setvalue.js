var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Sets the amount of money you'll get in the server's currency for converting 1 unit of the mining money.",
	"a":["amount"],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined || isNaN(Number(args[0]))) {
			msg.channel.send("What? We need a number.");
		} else {
			bal.currency[msg.guild.id].config.mineValue = args[0];
			msg.channel.send("OK.")
		}
		return bal;
	}
}
