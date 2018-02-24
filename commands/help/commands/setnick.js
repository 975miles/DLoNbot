var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var c = requireDir("../../", {recurse: true});

module.exports = {
	"d":"Sets my nickname.",
	"a":["nick"],
	"g":"a",
	"f":function (msg,bot,args,bal) {
		if (args[0] != undefined) {
            msg.guild.me.setNickname(args.join(" "));
            msg.channel.send("Are you sure this is legal?");
        }
        return bal;
	}
}
