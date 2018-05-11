var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Creates a nation for a leader. Only overriders can use this.",
	"a":["@user"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		if (args[0] == undefined) {
			msg.channel.send("Who?")
		}
		args[0] = args[0].replace(/\D/g,'');
		if (bot.users.has(args[0])) {
			if (bal.nations[args[0]] == undefined) {
				bal.nations[args[0]] = {"name":msg.guild.name,"relations":{},"invite":"Ask the owner to set an invite."};
				msg.channel.send("k");
			}
			else {
				msg.channel.send("Don't they already have a nation?");
			}
		}
		else {
			msg.channel.send("Not a person.");
		}
        return bal;
	}
}
