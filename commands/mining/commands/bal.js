var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Mine to get minerals! Can be used once per" + cooldown + "seconds.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		output += "Your balances:";
		for (var mineral in bal.mining[msg.author.id].minerals) {
			output += "\n" + mineral + ": `" + bal.mining[msg.author.id].minerals[mineral] + "`";
		}
		output += "\n\nmoney: " + "`" + bal.mining[msg.author.id].money;
		msg.channel.send(output);
		return bal;
	}
}
