var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"List the exchange rates for every server.",
	"a":[],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var output = "";
		for (var i in bal.currency) {
			if (functions.checktot(i) != 0) { 
				output = output + "Rates for " + bal.currency[i].config.name + ":\n";
				for (n in bal.currency) {
					if (n != i) {
						if (functions.checktot(n) != 0) {
							output = output + "  1 unit: " + functions.checktot(n) / functions.checktot(i) + " unit(s) in " + bal.currency[n].config.name + "\n";
						}
					}
				}
			}
		}
		fs.writeFile('all.txt', output);
		msg.channel.send("Here it is, I guess.", {file: 'all.txt'});
		return bal;
	}
}