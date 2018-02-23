var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Lists all modules and if they're enabled in the server.",
	"a":[],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		var output = "Modules:\n\n```";
		for (var m in c) {
			if (m != "help") {
				output += m + " (" + c[m].config.p + ") : " + bal.config[msg.guild.id][m] + "\n";
			}
		}
		output += "\n```";
		msg.channel.send(output);
		return bal;
	}
}