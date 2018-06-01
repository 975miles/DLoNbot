var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
cooldown = 600;

module.exports = {
	"d":"Mine to get minerals! Can be used once per " + cooldown + " seconds.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (bal.mining[msg.author.id].nextShift < Date.now()) {
			var output = "Shift **" + bal.mining[msg.author.id].shiftsCompleted + "** completed! Here's what you got:\n";
			for (var mineral in bal.mining[msg.author.id].minerals) {
				var adding = Math.random() * (config.months[mineral].yields.max -config.months[mineral].yields.min) + config.months[mineral].yields.min;
				if (functions.time(Date.now()).monthName == mineral) {
					adding *= 5;
				}
				bal.mining[msg.author.id].minerals[mineral] += adding;
				output += "\n" + (functions.time(Date.now()).monthName == mineral ? mineral + " (5x month bonus)" : mineral) + ": `" + Math.round(adding * 100000) / 100000  + "g`";
			}
			bal.mining[msg.author.id].nextShift = Date.now() + (cooldown * 1000);
			bal.mining[msg.author.id].shiftsCompleted++;
			msg.channel.send(output);
		} else {
			msg.channel.send("You completed a shift recently. Please wait **" + Math.round((bal.mining[msg.author.id].nextShift - Date.now()) / 1000) + "** seconds to mine again.");
		}
		return bal;
	}
}
