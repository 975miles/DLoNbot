var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Remmoves the internet from the current channel.",
	"a":[],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		if (bal.internet.channels[msg.channel.id] != undefined) {
			delete bal.internet.channels[msg.channel.id];
			msg.channel.send("Success!");
		}
		else {
			msg.channel.send("This channel isn't an internet channel.");
		}
		return bal;
	}
}