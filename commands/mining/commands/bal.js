var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Shows your balance.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			args[0] = msg.author.id;
		}
		args[0] = args[0].replace(/\D/g,'');
		if (bal.mining[args[0]] == undefined) {
			msg.channel.send("Please @mention the user. If you did, this person has never mined.");
		} else {
			var output = "Balances:";
			for (var mineral in bal.mining[args[0]].minerals) {
				output += "\n" + mineral + ": `" + bal.mining[args[0]].minerals[mineral] + "g`";
			}
			output += "\n\nmoney: " + "`£" + Math.round(bal.mining[args[0]].money * 100) / 100 + "`";
			msg.channel.send(output);
		}
		return bal;
	}
}
