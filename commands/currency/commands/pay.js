var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Pay a user.",
	"a":["@user","amount"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			msg.channel.send("Who?")
		}
		args[0] = args[0].replace(/\D/g,'');
		args[1] = Math.abs(Number(args[1]));
		
		if (bal.currency[msg.guild.id].bank[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient.");
		}
		else if (isNaN(args[1])) {
			msg.channel.send("You have to pay the recipient some amount.");
		}
		else if (bal.currency[msg.guild.id].bank[msg.author.id].bal < args[1]) {
			msg.channel.send("You don\'t have enough.");
		}
		else {
			bal.currency[msg.guild.id].bank[msg.author.id].bal -= args[1];
			bal.currency[msg.guild.id].bank[args[0]].bal += args[1];
			msg.channel.send("Ok.");
		}
		return bal;
	}
}
