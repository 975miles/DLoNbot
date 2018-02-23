var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"Taxes everyone a certain percentage and gives the money to you.",
	"a":["percentage"],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		if (isNaN(args[0])) {
			msg.channel.send("yes yes that is a number yes");
			return bal;
		}
		if (args[0] > 100) {
			msg.channel.send("Sorry, but I'm not going to let you put everyone into debt.");
		}
		else if (args[0] <= 0) {
			msg.channel.send("You want to tax... a negatuve number... I have a feeling that's not how tax works.");
		}
		else {
			var prev = functions.checktot(msg.guild.id);
			args[0] = args[0].replace(/\D/g,'');
			args[0] = Number|(args[0]);
			var taxtaken = 0;
			for (i in bal.currency[msg.guild.id].bank){
				if (i != msg.author.id) {
					taxtaken += bal.currency[msg.guild.id].bank[i].bal / 100 * args[0]
					bal.currency[msg.guild.id].bank[msg.author.id].bal = bal.currency[msg.guild.id].bank[msg.author.id].bal + (bal.currency[msg.guild.id].bank[i].bal / 100 * args[0])
					bal.currency[msg.guild.id].bank[i].bal = bal.currency[msg.guild.id].bank[i].bal - (bal.currency[msg.guild.id].bank[i].bal / 100 * args[0])
				}
			}
			var aft = functions.checktot(msg.guild.id);
			if (prev != aft) {
				bal.currency[msg.guild.id].bank[msg.author.id].bal = bal.currency[msg.guild.id].bank[msg.author.id].bal + (prev - aft)
			}
			msg.channel.send("Your balance: **" + bal.currency[msg.guild.id].config.sym + bal.currency[msg.guild.id].bank[msg.author.id].bal + "**\nTotal balance: **" + bal.currency[msg.guild.id].config.sym + functions.checktot(msg.guild.id) + "**\nTotal taxed: **" + bal.currency[msg.guild.id].config.sym + taxtaken + "**");
		}
		return bal;
	}
}