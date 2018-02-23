var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"\"YOU\'RE FIRED!\"",
	"a":["@user"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			msg.channel.send("Ｗｈｏ？");
			return bal;
		}

		args[0] = args[0].replace(/\D/g,'');
		
		if (bal.currency[msg.guild.id].bank[msg.author.id]["employing"][args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient. If you did, this member isn't being employed by you.");
		}
		else {
			delete bal.currency[msg.guild.id].bank[msg.author.id]["employing"][args[0]];
			msg.channel.send("Success!");
		}
		return bal;
	}
}