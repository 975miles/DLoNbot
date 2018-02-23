var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Checks the balance of a user. If you don't mention a user, your own balance will be showed.",
	"a":["@user"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == null) {
			args[0] = msg.author.id;
		}
		args[0] = args[0].replace(/\D/g,'');
		if (bal.currency[msg.guild.id].bank[args[0]] == undefined) {
			msg.channel.send("Put an @ before the username of the recipient.");
		}
		else {
			var money = bal.currency[msg.guild.id].bank[args[0]].bal.toString();
			if (money.toString().includes(".")) {
				money = money.toString().substring(0,(money.indexOf(".") + 3));
			}
			msg.channel.send("**" + bal.currency[msg.guild.id].config.sym + money + "**.");
		}
		return bal;
	}
}