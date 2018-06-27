var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Blacklists people from using the bot.",
	"a":["id1", "[id2", "...]"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		for (var m = 0; m < args.length; m++) {
			if (bal.config.blacklisted.includes(args[m])) {
				bal.config.blacklisted.append(args[m]);
				if (bot.users.has(args[m])) {
					msg.channel.send(bot.users.get(args[m]).toString() + " is now blacklisted.");
				} else {
					msg.channel.send("User with ID `" + args[m] + "` is now blacklisted.");
				}
			} else {
				if (bot.users.has(args[m])) {
					msg.channel.send(bot.users.get(args[m]).toString() + " is already blacklisted.");
				} else {
					msg.channel.send("User with ID `" + args[m] + "` is already blacklisted.");
				}
			}
		}
		msg.channel.send("Done.")
		return bal;
	}
}
