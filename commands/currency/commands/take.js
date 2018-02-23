var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Takes an amount of money from a user.",
	"a":["@user","amount"],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			msg.channel.send("wut");
		}

		args[0] = args[0].replace(/\D/g,'');
		args[1] = Math.abs(Number(args[1]));
		
		if (bal.currency[msg.guild.id].bank[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient. If you did, this member has not registered yet. Ask them to send a message in this channel.");
		}
		else if (isNaN(args[1])) {
			msg.channel.send("You have to take *some* amount.");
		}
		else {
			var prev = functions.checktot(msg.guild.id);
			bal.currency[msg.guild.id].bank[msg.author.id].bal = bal.currency[msg.guild.id].bank[msg.author.id].bal + args[1]
			bal.currency[msg.guild.id].bank[args[0]].bal = bal.currency[msg.guild.id].bank[args[0]].bal - args[1]
			msg.channel.send("Your balance: **" + bal.currency[msg.guild.id].config.sym + bal.currency[msg.guild.id].bank[msg.author.id].bal + "**" );
			msg.channel.send("Their balance: **" + bal.currency[msg.guild.id].config.sym + bal.currency[msg.guild.id].bank[args[0]].bal + "**" );
			var aft = functions.checktot(msg.guild.id);
			if (prev != aft) {
				bal.currency[msg.guild.id].bank[msg.author.id].bal = bal.currency[msg.guild.id].bank[msg.author.id].bal + (prev - aft)
			}
		}
		return bal;
	}
}