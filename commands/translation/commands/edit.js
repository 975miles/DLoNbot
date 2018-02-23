var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var overriders = (require("../../../config.json").overriders);
var fs=require('fs');

module.exports = {
	"d":"Used to edit a language. Use it to get help.",
	"a":["language"],
	"g":"e",
	"stuff":{
		"addword":{
			"d":"Adds a word to the dictionary.",
			"a":["English word","translation"],
			"f":function (msg, bot, args, bal, changing) {
				if (args[2] != undefined) {
					if (args[3] != undefined) {
						bal.translation[functions.getLangOwner(args[0])].words[args[2]] = args[3];
						msg.channel.send("Yea I got you. " + args[2] + " means " + args[3] + " in " + bal.translation[functions.getLangOwner(args[0])].name + ".");
					}
					else {
						msg.channel.send("W h a t ?");
					}
				}
				else {
					msg.channel.send("W h a t ?");
				}
				return bal;
			}
		},
		"removeword":{
			"d":"Removes a word from the dictionary.",
			"a":["English word"],
			"f":function (msg, bot, args, bal, changing) {
				if (args[2] != undefined) {
					if (Object.keys(bal.translation[functions.getLangOwner(args[0])].words).includes(args[2])) {
						delete bal.translation[functions.getLangOwner(args[0])].words[args[2]];
						msg.channel.send("Wait... that's not a word...\n\n**ANY MORE** HAHA PRANK\'D");
					}
					else {
						msg.channel.send("wait that word has never existed what are you trying to do, break me? that's mean");
					}
				}
				else {
					msg.channel.send("W h a t ?");
				}
				return bal;
			}
		},
		"alphabet":{
			"d":"Sets the alphabet that will show in the dictionary.",
			"a":["every letter of the alphabet seperated by spaces"],
			"f":function (msg, bot, args, bal, changing) {
				if (args.length < 3) {
					msg.channel.send("W h a t ?");
				}
				else {
					bal.translation[functions.getLangOwner(args[0])].alphabet = [];
					for (var letter = 2; letter < args.length; letter++) {
						bal.translation[functions.getLangOwner(args[0])].alphabet.push(args[letter]);
					}
					msg.channel.send("The alphabet is now " + bal.translation[functions.getLangOwner(args[0])].alphabet.join("") + ".");
				}
				return bal;
			}
		},
		"setname":{
			"d":"Sets the name of a language.",
			"a":["newname"],
			"f":function (msg, bot, args, bal, changing) {
				if (args[2] != undefined) {
					if (functions.realLanguage(args[2])) {
						msg.channel.send("there's already a language named" + args[2]);
					}
					else {
						bal.translation[functions.getLangOwner(args[0])].name = args[2];
						msg.channel.send("The language is now called **" + bal.translation[functions.getLangOwner(args[2])].name + "**.");
					}
				}
				else {
					msg.channel.send("What, you think I'm jst gonna let your language be called \" \"? Yeah, right.");
				}
				return bal;
			}
		},
		"addeditor":{
			"d":"Gives another user edit permissions for the language.",
			"a":["@user"],
			"f":function (msg, bot, args, bal, changing) {
				if (args[2] != undefined) {
					args[2] = args[2].replace(/\D/g,'');
					if (args[2] == "") {
						msg.channel.send("@mention the user.");
					}
					else if (bal.translation[functions.getLangOwner(args[0])].editors.includes(args[2])) {
						msg.channel.send("That user's already an editor");
					}
					else if (!(bot.users.exists("id", args[2]))) {
						msg.channel.send("Who's that?");
					}
					else if (bal.translation[functions.getLangOwner(args[0])].editors.includes(args[2])) {
						msg.channel.send("They're already an editor.");
					}
					else {
						bal.translation[functions.getLangOwner(args[0])].editors.push(args[2]);
						msg.channel.send("Success!");
					}
				}
				else {
					msg.channel.send("Who?")
				}
				return bal;
			}
		},
		"removeeditor":{
			"d":"Removes edit permissions for the language from a user.",
			"a":["@user"],
			"f":function (msg, bot, args, bal, changing) {
				if (args[2] != undefined) {
					args[2] = args[2].replace(/\D/g,'');
					if (bal.translation[functions.getLangOwner(args[0])].editors.includes(args[2])) {
						bal.translation[functions.getLangOwner(args[0])].editors.splice(bal.translation[functions.getLangOwner(args[0])].editors.indexOf(args[2]),1);
						msg.channel.send("Success!");
					}
					else {
						msg.channel.send("That user isn't an editor.");
					}
				}
				else {
					msg.channel.send("Who?")
				}
				return bal;
			}
		}
	},
	"f":function (msg, bot, args, bal) {
			var changing = msg.author.id;
			if (args[0] != undefined && functions.realLanguage(args[0])) {
				if (bal.translation[functions.getLangOwner(args[0])].editors.includes(msg.author.id) || functions.getLangOwner(args[0]) == msg.author.id || overriders.includes(msg.author.id)) {
					if (args[1] != undefined && this.stuff[args[1]] != undefined) {
						bal = this.stuff[args[1]].f(msg, bot, args, bal, changing);
					}
					else {
						var output = "This is what you can do:\n\n";
						for (var s in this.stuff) {
							output += "\n`" + s;
							if (this.stuff[s].a.length > 0) {
								output += " [" + this.stuff[s].a.join("] [") + "]`";
							}
							else {
								output += "`";
							}
							output += " : " + this.stuff[s].d;
						}
						msg.channel.send(output);
					}
				}
				else {
					msg.channel.send("You do not have edit access!");
				}
			}
			else {
				var output = "";
				for (var i in bal.translation) {
					if (bal.translation[i].editors.includes(msg.author.id) || i == msg.author.id || overriders.includes(msg.author.id)) {
						output += bal.translation[i].name + ", ";
					}
				}
				output = output.substring(0, output.length - 2)
				fs.writeFile('all.txt', output);
				msg.channel.send("These are the languages that you can edit:", {file: 'all.txt'});
			}
		return bal;
	}
}