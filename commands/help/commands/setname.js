var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Sets my username.",
	"a":["name"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		bot.user.setUsername(args.join(" "));
		msg.channel.send("k");
		return bal;
	}
}
