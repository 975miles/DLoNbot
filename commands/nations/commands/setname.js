var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Sets the name of your nation.",
	"a":["name"],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		if (bal.nations[msg.author.id]) {
			if (args[0] == undefined) {
				msg.channel.send("Wat?")
			}
			else {
				bal.nations[msg.author.id].name = args.join(" ");
				msg.channel.send(bal.nations[msg.author.id].name + "\n\nGot it.");
			}
		}
		else {
			msg.channel.send("You have no nation.");
		}
        return bal;
	}
}
