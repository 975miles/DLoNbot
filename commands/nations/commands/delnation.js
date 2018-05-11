var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Deletes a user's nation. Only overriders can use this.",
	"a":["@user"],
	"g":"o",
	"f":function (msg,bot,args,bal) {
		if (args[0] == undefined) {
			msg.channel.send("Whose?")
		}
		args[0] = args[0].replace(/\D/g,'');
		if (bal.nations[args[0]]) {
			delete bal.nations[args[0]];
			msg.channel.send("k");
		}
		else {
			msg.channel.send("Do they even have a nation?");
		}
        return bal;
	}
}
