var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Sets my avatar. Can only be used by overriders.",
	"a":["nick"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		if (args[0] != undefined) {
			bot.user.setAvatar(args[0]);
			msg.channel.send("k");
		}
		else {
			msg.channel.send("Set it to... what?");
		}
	}
}
