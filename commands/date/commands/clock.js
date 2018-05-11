var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"Tells you the Mynaze time. Format: Y/M/D H:M:S",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var time = functions.time(Date.now());
		msg.channel.send("```" + 
			time.year + "/" + 
			time.monthName + "(" + (time.month + 1) +")/" + 
			time.day + " " +
			time.hour + ":" +
			time.minute + ":" +
			time.second + "```");
		return bal;
	}
}
