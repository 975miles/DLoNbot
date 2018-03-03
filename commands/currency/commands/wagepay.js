var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"Pays all wages from all people.",
	"a":[],
	"g":"a",
	"f":function (msg, bot, args, bal) {
		var output = "";
		for (i in bal.currency[msg.guild.id].bank) {
			output +=  bal.currency[msg.guild.id].bank[i].name + " paid: \n";
			for (n in bal.currency[msg.guild.id].bank[i].employing) {
				if (bal.currency[msg.guild.id].bank[i].bal >= bal.currency[msg.guild.id].bank[i].employing[n]) {
					bal.currency[msg.guild.id].bank[i].bal -= bal.currency[msg.guild.id].bank[i].employing[n];
					bal.currency[msg.guild.id].bank[n].bal += bal.currency[msg.guild.id].bank[i].employing[n];
					output += "  " + bal.currency[msg.guild.id].bank[n].name + ": " + bal.currency[msg.guild.id].bank[i].employing[n] + "\n";
				}
				else {
					output += "  " + bal.currency[msg.guild.id].bank[n].name + ": " + bal.currency[msg.guild.id].bank[i].employing[n] + " !!NOT DONE!! Not enough balance to do this. git gud \n";
				}
			}
		}
		if (output.length > 1995) {
			fs.writeFile('all.txt', output);
			msg.channel.send("Here's the log.", {file: 'all.txt'});
		}
		else {
			msg.channel.send(output);
		}
		return bal;
	}
}
