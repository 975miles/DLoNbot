var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"List all employees of a user.",
	"a":["@user"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var output = "";
		if (args[0] == undefined) {
			args[0] = msg.author.id;
		}
		args[0] = args[0].replace(/\D/g,'');
		if (bal.currency[msg.guild.id].bank[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient. If you did, this member has not registered yet. Ask them to send a message in this channel.");
		}
		else {
			for (i in bal.currency[msg.guild.id].bank[args[0]].employing){
				output += "Wage of " + bal.currency[msg.guild.id].bank[i].name + ": " + bal.currency[msg.guild.id].config.sym + bal.currency[msg.guild.id].bank[args[0]].employing[i] + "\n";
			}
			if (output.length > 1995) {
				fs.writeFile('all.txt', output);
				msg.channel.send("Here it is, I guess.", {file: 'all.txt'});
			}
			else {
				msg.channel.send(output);
			}
		}
		return bal;
	}
}