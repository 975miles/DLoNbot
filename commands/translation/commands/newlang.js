var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Creates a new language, owned by you.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (bal.translation[msg.author.id] == undefined) {
			bal.translation[msg.author.id] = {"name":msg.id,"alphabet":["A","B","C"],"words":{},"editors":[]};
			msg.channel.send("Done.");
		}
		else {
			msg.channel.send("You already have a language.");
		}
		return bal;
	}
}