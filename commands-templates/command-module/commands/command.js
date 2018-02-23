var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	//description of the command (shows in help)
	"d":"This is a test command.",
	//arguments needed (shows in help)
	"a":["arg1","arg2"],
	//permissions of the command ("a" for admins(people with the Bot Admin role or with the administrator permission in the server) or "e" for everyone)
	"g":"e",
	//what the command does
	"f":function (msg, bot, args, bal) {
		//commandy stuff, y'know?
		return bal;
	}
}