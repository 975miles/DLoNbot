var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Sets my game.",
	"a":["game"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		bot.user.setActivity(args.join(" "));
		msg.channel.send("k");
	}
}
