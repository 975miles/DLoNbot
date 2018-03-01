var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Sets my status.",
	"a":["discord.js.org/#/docs/main/stable/typedef/PresenceStatus"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		bot.user.setStatus(args[0]);
		msg.channel.send("k");
	}
}
