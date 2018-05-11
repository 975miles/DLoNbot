var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Lists nations and invites",
	"a":[],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		var output = "";
		for (var nation in bal.nations) {
			output += bal.nations[nation].name + " (";
			if (bot.users.has(nation)) {
				output += "owned by " + bot.users.get(nation).tag;
			} else {
				output += "user left community, nation pending deletion";
			}
			output += ")" +
			" : " + bal.nations[nation].invite + "\n";
		}
		msg.channel.send(output);
        return bal;
	}
}
