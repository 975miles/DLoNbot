var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"Lists every public website.",
	"a":[],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		var serverAmounts = {};
		var output = "";
		for (var i in bal.internet.sites) {
			if (bal.internet.sites[i].public) {
				serverAmounts[i] = 0;
				for (var n in bal.internet.channels) {
					if (bal.internet.channels[n] == bal.internet.sites[i].name) {
						serverAmounts[i]++;
					}
				}
			}
		}
		for (var i in serverAmounts) {
			if (bot.users.find("id", i)) {
				var username = bot.users.get(i).username;
			}
			else {
				var username = i;
			}
			output += bal.internet.sites[i].name + ", owned by " + username + ", which is in " + serverAmounts[i] + " channels. Chat lock status: " + bal.internet.sites[i].chatLock.locked + "\n";
		}
		fs.writeFile('all.txt', output);
		msg.channel.send("Here they are.", {file: 'all.txt'});
		return bal;
	}
}
