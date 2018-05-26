var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Sarcasm",
	"a":[],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		msg.channel.send(msg.author.toString());
		return bal;
	}
}
