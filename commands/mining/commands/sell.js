var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var cooldown = 600;
var values = {
	"diamond":[0,0.01]100,
	"platinum":[0,0.02]200,
	"gold":[0.1,1],
	"silver":[0.5,20],
	"bronze":[5,50],
	"stone":[100,500]
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
			output += "\n" + mineral + ": `" + adding + "`";
		}
		output += "\n\ntotal: `" + total + "`";
		msg.channel.send(output);
		return bal;
	}
}
