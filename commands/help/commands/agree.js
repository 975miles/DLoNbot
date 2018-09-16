var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");

module.exports = {
	"d":"Agree to the commandment of the pussy.",
	"a":[],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		if (msg.guild.id == "490908587174920193") {
			msg.member.addRole("490910428608593931");
			msg.delete();
		} else {
			msg.channel.send("https://discord.gg/tJe6698");
		}
		return bal;
	}
}
