var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Sets the name of your nation.",
	"a":["name"],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		var output = "";
		for (var nation of bal.nations) {
			output += bal.nations[nation].name + 
			"(" + (bot.users.has(nation) ? "owned by " + bot.users.get(nation).tag : "user left community, nation pending deletion") + ")" +
			" : " + bal.nations[nation].invite + "\n";
		}
		msg.channel.send(output);
        return bal;
	}
}
