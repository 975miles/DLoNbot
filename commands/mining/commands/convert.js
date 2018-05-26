
var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Converts some of your mining money into the currency of the server.",
	"a":["amount / all"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (bal.currency[msg.guild.id].config.mineValue == undefined || bal.currency[msg.guild.id].config.mineValue <= 0) {
			msg.channel.send("This server\'s currency value is too low!");
		} else {
			if (args[0] == "all") {
				var getting = bal.mining[msg.author.id].money * bal.currency[msg.guild.id].config.mineValue;
				bal.currency[msg.guild.id].bank[msg.author.id].bal += getting;
				msg.channel.send("You converted " + bal.mining[msg.author.id].money + "into **" + getting + "**.");
				bal.mining[msg.author.id].money = 0;
			} else if (!isNaN(Number(args[0]))) {
				args[0] = Number(args[0]);
				if (args[0] > bal.mining[msg.author.id].money) {
					msg.channel.send("You don't have enough money.");
				} else {
					var getting = args[0] * bal.currency[msg.guild.id].config.mineValue;
					bal.currency[msg.guild.id].bank[msg.author.id].bal += getting;
					msg.channel.send("You converted " + Math.round(args[0] * 100) / 50 + " into **" + Math.round(getting * 100) / 50 + "**.");
					bal.mining[msg.author.id].money -= args[0];
				}
			} else {
				msg.channel.send("You need to specify an amount!");
			}
		}
		return bal;
	}
}
