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
		
		if (bal.mining[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient. If you did, this member has not registered yet. Ask them to send a message in this channel.");
		}
		else if (isNaN(args[1])) {
			msg.channel.send("You have to pay the recipient some amount.");
		}
		else if (bal.mining[msg.author.id].money < args[1]) {
			msg.channel.send("You don\'t have enough.");
		}
		else {
			bal.mining[msg.author.id].money -= args[1];
			bal.mining[args[0]].money += args[1];
			msg.channel.send("Ok.");
		}
		return bal;
	}
}
