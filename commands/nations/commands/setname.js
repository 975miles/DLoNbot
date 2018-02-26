var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Sets the name of your nation.",
	"a":["name"],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		if (functions.hasNation(msg.author.id)) {
			if (args[0] == undefined) {
				msg.channel.send("Wat?")
			}
			else {
				if (functions.realNation(args.join(" "))) {
					msg.channel.send("that's already a nation, impersonator");
				}
				else {
					var transferring = functions.getNation(msg.author.id);
					bal.nations[args.join(" ")] = bal.nations[transferring];
					delete bal.nations[transferring];
					msg.channel.send(bal.nations[msg.author.id].name + "\n\nGot it.");
				}
			}
		}
		else {
			msg.channel.send("You have no nation.");
		}
        return bal;
	}
}
