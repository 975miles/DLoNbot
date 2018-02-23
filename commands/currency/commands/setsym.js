var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Sets the currency symbol of the server.",
	"a":["newsymbol"],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			bal.currency[msg.guild.id].config.sym = "";
			msg.channel.send("You don't want a currency symbol? Whatever.");
		}
		else if (args[0].length > 40) {
			msg.channel.send("Please. This is a symbol. Please can you please keep it to limit of, please, less than 40 characters please.");
		}
		else {
			bal.currency[msg.guild.id].config.sym = args[0];
			msg.channel.send("Uh huh, got it. I set your currency symbol to **" + bal.currency[msg.guild.id].config.sym + "**.");
		}
		return bal;
	}
}