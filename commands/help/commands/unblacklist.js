var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Removes people from the bot's blacklist.",
	"a":["id1", "[id2", "...]"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		for (var m = 0; m < args.length; m++) {
			if (bal.config.blacklisted.includes(args[m])) {
				bal.config.blacklisted.splice(bal.config.blacklisted.indexOf(args[m]));
				if (bot.users.has(args[m])) {
					msg.channel.send(bot.users.get(args[m]).toString() + " is no longer blacklisted.");
				} else {
					msg.channel.send("User with ID `" + args[m] + "` is no longer blacklisted.");
				}
			} else {
				if (bot.users.has(args[m])) {
					msg.channel.send(bot.users.get(args[m]).toString() + " isn\'t blacklisted.");
				} else {
					msg.channel.send("User with ID `" + args[m] + "` isn\'t blacklisted.");
				}
			}
		}
		msg.channel.send("Done.")
		return bal;
	}
}
