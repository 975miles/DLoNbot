var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"Shows the dictionary of a language.",
	"a":["language"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		if (args[0] == undefined) {
			msg.channel.send("Which language?");
		}
		else if (!(functions.realLanguage(args[0]))) {
			msg.channel.send("I... don't think that\'s a language...");
		}
		else {
			var words = [];
			if (functions.objectSize(bal.translation[functions.getLangOwner(args[0])].words) != 0) {
				for (var i in bal.translation[functions.getLangOwner(args[0])].words) {
					words.push([i,[bal.translation[functions.getLangOwner(args[0])].words[i]]]);
				}
			}
			else {
				words.push(["Oh no...",["there are none."]]);
			}
			words.sort();
			var words2 = "";
			for (var i = 0; i < words.length; i++) {
				words2 += "\n" + words[i][0] + ": " + words[i][1][0];
			}
			var editors = "";
			if (bal.translation[functions.getLangOwner(args[0])].editors.length > 0) {
				for (var i = 0; i < bal.translation[functions.getLangOwner(args[0])].editors.length; i++) {
					var username = bal.translation[functions.getLangOwner(args[0])].editors[i];
					if (bot.users.exists("id", bal.translation[functions.getLangOwner(args[0])].editors[i])) {
						username = bot.users.find("id", bal.translation[functions.getLangOwner(args[0])].editors[i]).username;
					}
					editors += username + ", ";
				}
				editors = editors.substring(0, editors.length - 2)
			}
			else {
				editors = "Nobody else.";
			}
			var creatorName = functions.getLangOwner(args[0]);
			if (bot.users.exists("id", functions.getLangOwner(args[0]))) {
				creatorName = bot.users.find("id", functions.getLangOwner(args[0])).username;
			}
			var output = "The Dictionary of the " + bal.translation[functions.getLangOwner(args[0])].name + " Language\n\n\nMade by: " + creatorName + "\nAdditional Editors: " + editors + "\n\nAlphabet: " + bal.translation[functions.getLangOwner(args[0])].alphabet.join(" ") + "\n\nTranslations:" + words2;
			fs.writeFile('all.txt', output);
			msg.channel.send("Here it is.", {file: 'all.txt'});
		}
		return bal;
	}
}
