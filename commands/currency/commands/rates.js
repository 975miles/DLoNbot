var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"Shows the exchange rates for this server.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var output = "Rates for " + bal.currency[msg.guild.id].config.name + ":\n";
		if (functions.checktot(msg.guild.id) != 0) { 
			for (var i in bal.currency) {
				if (i != msg.guild.id) {
					if (functions.checktot(i) != 0) {
						output = output + "  1 unit: " + functions.checktot(i) / functions.checktot(msg.guild.id) + " unit(s) in " + bal.currency[i].config.name + "\n";
					}
				}
			}
		}
		else {
			output = output + "There's no money in this economy! How am I supposed to calculate exchange rates with this?";
		}
		fs.writeFile('all.txt', output);
		msg.channel.send("Here it is, I guess.", {file: 'all.txt'});
		return bal;
	}
}
