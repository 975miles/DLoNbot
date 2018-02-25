var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Creates a nation for a leader. Only overriders can use this.",
	"a":["@user"],
	"g":"a",
	"f":function (msg,bot,args,bal) {
		if (config.overriders.includes(msg.author.id)) {
			if (args[0] == undefined) {
				msg.channel.send("Who?")
			}
			args[0] = args[0].replace(/\D/g,'');
			args[1] = Math.abs(Number(args[1]));
			if (bot.users.has(args[0])) {
				if (bal.nations[args[0]] == undefined) {
					bal.nations[args[0]] = {"relations":{},"info":"This nation has no info yet."};
					msg.channel.send("k");
				}
				else {
					msg.channel.send("Don't they already have a nation?");
				}
			}
			else {
				msg.channel.send("Not a person.");
			}
		}
		else {
			msg.channel.send("You aren't an overrider.");
		}
        	return bal;
	}
}
