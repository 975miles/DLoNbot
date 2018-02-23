var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Sets the internet site of a channel.",
	"a":["address"],
	"g":"a",
	"f":function (msg,bot,args,bal) {
		if (!(functions.checkAvailable(args[0]))) {
			bal.internet.channels[msg.channel.id] = args[0];
			msg.channel.send("Success!");
		}
		else {
			msg.channel.send("That's not a website.");
		}
		return bal;
	}
}