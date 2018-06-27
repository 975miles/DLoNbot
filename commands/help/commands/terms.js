var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Gives a link to the terms of service. It's reccommended to read these before using the bot.",
	"a":[],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		msg.channel.send("https://goo.gl/FPGpud");
		return bal;
	}
}
