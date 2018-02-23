var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Splits a certain amount of money between everyone else in the server.",
	"a":["amount"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {

		}

		args[0] = Math.abs(Number(args[0]));
		if (args[0] > bal.currency[msg.guild.id].bank[msg.author.id].bal) {
			msg.channel.send("You don't have enough.");
		}
		else if (args[0] <= 0) {
			msg.channel.send("MORE.");
		}
		else if (isNaN(args[0])) {
			msg.channel.send("If you think that's a number, *wut*.");
		}
		else {
			var prev = functions.checktot(msg.guild.id);
			var amountgiven = args[0] / (Object.keys(bal.currency[msg.guild.id].bank).length - 1);
			for (i in bal.currency[msg.guild.id].bank){
				if (i != msg.author.id) {
					bal.currency[msg.guild.id].bank[msg.author.id].bal = bal.currency[msg.guild.id].bank[msg.author.id].bal - amountgiven;
					bal.currency[msg.guild.id].bank[i].bal = bal.currency[msg.guild.id].bank[i].bal + amountgiven;
				}
			}
			var aft = functions.checktot(msg.guild.id);
			if (prev != aft) {
				bal.currency[msg.guild.id].bank[msg.author.id].bal = bal.currency[msg.guild.id].bank[msg.author.id].bal + (prev - aft)
			}
			msg.channel.send("Right! I split your **" + bal.currency[msg.guild.id].config.sym + args[0] +"** between **" + (Object.keys(bal.currency[msg.guild.id].bank).length - 1) +"** citizens.\nYour balance: **" + bal.currency[msg.guild.id].config.sym + bal.currency[msg.guild.id].bank[msg.author.id].bal + "**\nAmount given to each person: **" + bal.currency[msg.guild.id].config.sym + amountgiven + "**");
		}
		return bal;
	}
}