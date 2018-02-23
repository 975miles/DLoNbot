var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Adds to the balance of a user. You can use negative numbers, too.",
	"a":["@user","amount"],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			msg.channel.send("***WHO!?***");
			return bal;
		}
		args[0] = args[0].replace(/\D/g,'');
		if (bal.currency[msg.guild.id].bank[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient. If you did, this member has not registered yet. Ask them to send a message in this channel.");
		}
		else if (isNaN(Number(args[1]))) {
			msg.channel.send("You have to type some amount.");
		}
		else {
			bal.currency[msg.guild.id].bank[args[0]].bal += Number(args[1]);
			msg.channel.send("Their balance: **" + bal.currency[msg.guild.id].config.sym + bal.currency[msg.guild.id].bank[args[0]].bal + "**" );
		}
		return bal;
	}
}