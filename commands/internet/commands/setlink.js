var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Sets the invite of your sever. People can click on the name of this server in an internet message to go to the link.",
	"a":["server invite"],
	"g":"a",
	"f":function (msg,bot,args,bal) {
		if (args[0] == undefined) {
			msg.channel.send("?");
		}
		else {
			bal.internet.links[msg.guild.id] = args[0];
			msg.channel.send("Success!");
		}
		return bal;
	}
}