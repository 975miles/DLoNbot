var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var cooldown = 600;
var amounts = {
	"diamond":[0,0.01],
	"platinum":[0,0.02],
	"gold":[0.1,1],
	"silver":[0.5,20],
	"bronze":[5,50],
	"stone":[100,500]
};

module.exports = {
	"d":"Mine to get minerals! Can be used once per " + cooldown + " seconds.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (bal.mining[msg.author.id].nextShift < Date.now()) {
			var output = "Shift completed! Here's what you got:\n";
			for (var mineral in bal.mining[msg.author.id].minerals) {
				var adding = Math.random() * (amounts[mineral][1] - amounts[mineral][0]) + amounts[mineral][0];
				bal.mining[msg.author.id].minerals[mineral] += adding
				output += "\n" + mineral + ": `" + adding + "g`";
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
