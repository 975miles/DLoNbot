var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Sets the amount of pencil reactions needed for a petition to become a vote.",
	"a":["amount"],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		if (args[0] != undefined && !(isNaN(args[0]))) {
			bal.config[msg.guild.id].petition.voteRequirement = Number(args[0]) + 1;
			msg.channel.send("Got it. When a petition gets " + bal.config[msg.guild.id].petition.voteRequirement + " signature reactions (including mine), it\'ll become a vote.");
		}
		else {
			msg.channel.send("I\'m not sure if that's a number...");
		}
		return bal;
	}
}