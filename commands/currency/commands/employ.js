var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Employ a user.",
	"a":["@user","wage"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			msg.channel.send("Ｗｈｏ？");
			return bal;
		}

		args[0] = args[0].replace(/\D/g,'');
		
		if (bal.currency[msg.guild.id].bank[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient. If you did, this member has not registered yet. Ask them to send a message in this channel.");
		}
		else if (isNaN(args[1])) {
			msg.channel.send("Is that a number?");
		}
		else if (args[1] <= 0) {
			msg.channel.send("That's not enough.");
		}
		else {
			bal.currency[msg.guild.id].bank[msg.author.id]["employing"][args[0]] = Number(args[1]);
			msg.channel.send("Success!");
		}
		return bal;
	}
}