var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});

module.exports = {
	"d":"This is a test command.", //description of the command (shows in help)
	"a":["arg1","arg2"], //arguments needed (shows in help)
	"g":"e", //permissions of the command ("a" for admins(people with the Bot Admin role or with the administrator permission in the server), "e" for everyone or "o" for overriders)
	"f":function (msg, bot, args, bal) { //what the command does
		//commandy stuff, y'know?
		return bal;
	}
}
