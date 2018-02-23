var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"Lists all languages.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var output = "All languages:\n";
		for (var i in bal.translation) {
			var username = i;
			if (bot.users.exists("id", i)) {
				username = bot.users.find("id", i).username;
			}
			output += "\n" + bal.translation[i].name + ", owned by " + username + ".";
		}
		fs.writeFile('all.txt', output);
		msg.channel.send("Here they are.", {file: 'all.txt'});
		return bal;
	}
}