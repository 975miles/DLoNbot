var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var config = require("../../../config.json");
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Deletes a user's nation. Only overriders can use this.",
	"a":["@user"],
	"g":"a",
	"f":function (msg,bot,args,bal) {
		if (args[0] == undefined) {
			msg.channel.send("Which?")
		}
		if (bal.nations[args[0]] != undefined) {
			delete bal.nations[args[0]];
			msg.channel.send("k");
		}
		else {
			msg.channel.send("Do they even have a nation?");
		}
        	return bal;
	}
}
