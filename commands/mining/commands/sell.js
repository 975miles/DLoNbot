var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var cooldown = 600;
var values = {
	"diamond":100,
	"platinum":50,
	"gold":1,
	"silver":0.05,
	"bronze":0.02,
	"stone":0.001
};

module.exports = {
	"d":"Convert your minerals to money",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var output = "Minerals sold.\n";
		var total = 0;
		for (var mineral in bal.mining[msg.author.id].minerals) {
			var adding = bal.mining[msg.author.id].minerals[mineral] * values[mineral];
			bal.mining[msg.author.id].minerals[mineral] = 0;
			bal.mining[msg.author.id].money += adding;
			total += adding;
			output += "\n" + mineral + ": `£" + Math.round(adding * 100) / 100 + "`";
		}
		output += "\n\ntotal: `£" + Math.round(total * 100) / 100 + "`";
		msg.channel.send(output);
		return bal;
	}
}
