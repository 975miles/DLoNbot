var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Sarcasm",
	"a":[],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		msg.delete();
		for (var sarcasm = 0; sarcasm < 5; sarcasm++) {
			msg.channel.send("THE PERSON ABOVE WAS BEING SARCASTIC. DO NOT TAKE WHAT THEY SAID SERIOUSLY.")
		}
		return bal;
	}
}
