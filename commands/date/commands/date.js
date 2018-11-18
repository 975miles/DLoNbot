var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Tells you the DNP time. Format: D/M/Y H:M",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var date = functions.date();
		msg.channel.send("```" + 
			date.day + "/" + 
			date.monthNum + "/" +
			date.year + " " +
			date.hour + ":" +
			date.minute + "```");
    msg.delete();
		return bal;
	}
}
