var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"List all employees of a user.",
	"a":["@user"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var output = "";
		var lsit = [];
		for (i in bal.mining[msg.guild.id]){
			lsit.push([Math.round(bal.mining[msg.guild.id].money * 100) / 100, (bot.users.has(i) ? bot.users.get(i).username : i));
		}
		lsit.sort(function(a,b){
			return a[0] - b[0];
		});
		lsit.reverse();
		for (var i = 0; i < lsit.length; i++){
			output = output + (i+1) + ": Balance of " + lsit[i][1] + ": **£" + lsit[i][0] + "**\n";
		}
		msg.channel.send(output);
		return bal;
	}
}
