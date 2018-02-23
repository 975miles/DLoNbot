var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var overriders = (require("../../../config.json").overriders);

module.exports = {
	"d":"Manage your website.",
	"a":[],
	"g":"e",
	"stuff":{
		"actions":{
			"kickall":{
				"d":"Removes the internet from each channel connected to your website.",
				"a":[],
				"f":function (msg, bot, args, bal, changing) {
					for (var currentChannel of bot.channels) {
						if (bal.internet.channels[currentChannel[1].id] == bal.internet.sites[changing].name) {
							delete bal.internet.channels[currentChannel[1].id];
							currentChannel[1].send("You've been kicked from the site by the owner.");
						}
					}
					return bal;
				}
			},
			"unban":{
				"d":"Unbans someone from sending messages in your website.",
				"a":["@user"],
				"f":function (msg, bot, args, bal, changing) {
					if (args[2] != undefined) {
						args[2] = args[2].replace(/\D/g,'');
						if (bal.internet.sites[changing].banned.includes(args[2])) {
							bal.internet.sites[changing].banned.splice(bal.internet.sites[changing].banned.indexOf(args[2]),1);
							msg.channel.send("Success!");
						}
						else {
							msg.channel.send("That user isn't banned.");
						}
					}
					else {
						msg.channel.send("Who?")
					}
					return bal;
				}
			},
			"ban":{
				"d":"Bans someone from **sending** messages in your website.",
				"a":["@user"],
				"f":function (msg, bot, args, bal, changing) {
					if (args[2] != undefined) {
						args[2] = args[2].replace(/\D/g,'');
						if (bal.internet.sites[changing].banned.includes(args[2])) {
							msg.channel.send("That user's already banned.");
						}
						else {
							bal.internet.sites[changing].banned.push(args[2]);
							msg.channel.send("Success!");
						}
					}
					else {
						msg.channel.send("Who?")
					}
					return bal;
				}
			}
		},
		"settings":{
			"address":{
				"d":"Changes the address used to connect to your website.",
				"a":["newaddress"],
				"f":function (msg, bot, args, bal, changing) {
					if (args[2] != undefined) {
						if (functions.checkAvailable(args[2])) {
							for (var currentChannel of bot.channels) {
								if (bal.internet.channels[currentChannel[1].id] == bal.internet.sites[changing].name) {
									bal.internet.channels[currentChannel[1].id] = args[2];
								}
							}
							bal.internet.sites[changing].name = args[2];
							msg.channel.send("Success!")
						}
						else {
							msg.channel.send("There's already a website with this name.");
						}
					}
					else {
						msg.channel.send("What. Is. The. Address.");
					}
					return bal;
				},
				"p":function (bal, changing, bot) {
					return bal.internet.sites[changing].name;
				}
			},
			"public":{
				"d":"Sets if your site can be found by " + require("../config.json").p + "sitelist.",
				"a":[],
				"f":function (msg, bot, args, bal, changing) {
					bal.internet.sites[changing].public = !(bal.internet.sites[changing].public);
					msg.channel.send("Success!");
					return bal;
				},
				"p":function (bal, changing, bot) {
					return bal.internet.sites[changing].public;
				}
			},
			"chatlock":{
				"d":"Sets if messages can only be **sent** in one channel.",
				"a":[],
				"f":function (msg, bot, args, bal, changing) {
					bal.internet.sites[changing].chatLock.locked = !(bal.internet.sites[changing].chatLock.locked);
					msg.channel.send("Success!");
					return bal;
				},
				"p":function (bal, changing, bot) {
					return bal.internet.sites[changing].chatLock.locked;
				}
			},
			"channel":{
				"d":"Use this in the channel that the chatlock should be set.",
				"a":[],
				"f":function (msg, bot, args, bal, changing) {
					bal.internet.sites[changing].chatLock.chatChannel = msg.channel.id;
					msg.channel.send("Success!");
					return bal;
				},
				"p":function (bal, changing, bot) {
					if (bal.internet.sites[changing].chatLock.chatChannel == "") {
						return "none";
					}
					else if (bot.channels.has(bal.internet.sites[changing].chatLock.chatChannel)) {
						return bot.channels.get(bal.internet.sites[changing].chatLock.chatChannel).toString();
					}
					return bal.internet.sites[changing].chatLock.chatChannel;
				}
			},
			"hidden":{
				"d":"Sets if the address can be seen in internet messages.",
				"a":[],
				"f":function (msg, bot, args, bal, changing) {
					bal.internet.sites[changing].hidden = !(bal.internet.sites[changing].hidden);
					msg.channel.send("Success!");
					return bal;
				},
				"p":function (bal, changing, bot) {
					return bal.internet.sites[changing].hidden;
				}
			}
		}
	},
	"f":function (msg, bot, args, bal) {
		console.log(this)
		var changing = msg.author.id;
		if (args[args.length - 2] == "override" && overriders.includes(msg.author.id)) {
			changing = args[args.length - 1];
		}
		if (bal.internet.sites[changing] == undefined) {
			bal.internet.sites[changing] = {"name":msg.id + ".net","public":false,"hidden":false,"chatLock":{"locked":false,"chatChannel":""},"banned":[]};
			msg.channel.send("New site created!");
		}
		if (args[0] == undefined || args[1] == undefined || this.stuff[args[0]] == undefined || this.stuff[args[0]][args[1]] == undefined) {
			var output = "Use `" + require("../config.json").p + "mysite [section] [selection] [arguments, if needed]` to use this command.\n";
			for (var sec in this.stuff) {
				output += "\n\n**" + sec + "**";
				for (var s in this.stuff[sec]) {
					output += "\n`" + s;
					if (this.stuff[sec][s].a.length > 0) {
						output += " [" + this.stuff[sec][s].a.join("] [") + "]`";
					}
					else {
						output += "`";
					}
					output += " : " + this.stuff[sec][s].d;
					if (sec == "settings") {
						output += " `" + this.stuff[sec][s].p(bal, changing, bot) + "`";
					}
				}
			}
			msg.channel.send(output);
		}
		else {
			console.log(args)
			console.
			bal = this.stuff[args[0]][args[1]].f(msg, bot, args, bal, changing);
		}
		return bal;
	}
}