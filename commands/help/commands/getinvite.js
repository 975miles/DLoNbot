var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Gives a link to invite the bot to a server.",
	"a":[],
	"g":"e",
	"f":function (msg,bot,args,bal) {
		bot.generateInvite(["MANAGE_MESSAGES"])
			.then(link => msg.channel.send(link));
		return bal;
	}
}
