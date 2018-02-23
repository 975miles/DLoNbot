var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Sets the amount of pencil reactions needed for a petition to become a vote.",
	"a":[],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		bal.config[msg.guild.id].petition.voteChannel = msg.channel.id;
		msg.channel.send("**FINE.**");
		return bal;
	}
}