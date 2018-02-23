var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Toggles a module on/off",
	"a":["module"],
	"g":"a",
	"f":function (msg,bot,args,bal) {
		if (Object.keys(c).includes(args[0]) && args[0] != "help") {
			bal.config[msg.guild.id][args[0]] = !(bal.config[msg.guild.id][args[0]]);
			msg.channel.send("Done.");
		}
		else {
			if (args[0] == "help") {
				msg.channel.send("This module can't be toggled off.");
			}
			else {
				msg.channel.send("Which module?");
			}
		}
        	return bal;
	}
}