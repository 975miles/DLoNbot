var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Shows the money statistics of the server and a user.",
	"a":["@user"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == null) {
			args[0] = msg.author.id;
		}
		args[0] = args[0].replace(/\D/g,'');
		if (bal.currency[msg.guild.id].bank[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient. If you did, this member has not registered yet. Ask them to send a message in this channel.");
		}
		else {
			var tot = 0;
			for (i in bal.currency) {
				tot += functions.checktot(i);
			}
			var val = (tot / Object.keys(bal.currency).length) / functions.checktot(msg.guild.id);
			msg.channel.send("Total balance of this server: **" + bal.currency[msg.guild.id].config.sym + functions.checktot(msg.guild.id) + "** \
			\nTotal balance of all servers: **" + tot + "** \
			\nServer count: **" + Object.keys(bal.currency).length + "** \
			\nAverage total balance: **" + tot / Object.keys(bal.currency).length + "** \
			\nThis server's currency's value per unit: **" + val + "** \
			\nThis user's balance: **" + bal.currency[msg.guild.id].config.sym + bal.currency[msg.guild.id].bank[args[0]].bal + " ** \
			\nThis user's balance multiplied by the currency value: **" + bal.currency[msg.guild.id].bank[args[0]].bal * val + "** \
			\nThis user's percentage of this server's total: **" + bal.currency[msg.guild.id].bank[args[0]].bal / functions.checktot(msg.guild.id) * 100  + "%** \
			\nUsers registered: **" + Object.keys(bal.currency[msg.guild.id].bank).length + "** \
			\nAverage balance in this server: **" + bal.currency[msg.guild.id].config.sym + functions.checktot(msg.guild.id) / Object.keys(bal.currency[msg.guild.id].bank).length + "** \
			\nThis user's percentage above average: **" + (bal.currency[msg.guild.id].bank[args[0]].bal / (functions.checktot(msg.guild.id) / Object.keys(bal.currency[msg.guild.id].bank).length) - 1) * 100 + "%**");
		}
		return bal;
	}
}