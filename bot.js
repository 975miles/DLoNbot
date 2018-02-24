const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true});
const requireDir = require('require-dir');
const fs=require('fs');

var c = requireDir("./commands", {recurse: true});
var functions = requireDir("./functions", {recurse: true});
var bal = require("./bal.json");
var config = require("./config.json");

var needsAdminResponse = "go get admin";
var overriders = ["106068236000329728"];

var botAdminRoleName = "DLoN bot controller";
var petitionReactions = ["✏","🗑"];
var voteReactions = ["407583649798553612","407583666244419585","407583858423496716"];
var additionalVoteReactions = [];
var petitionChannelName = "petitions";
var voteChannelName = "votes";
var DLoNguildID = "379086861978697740";
var newConfig = {"currency":true,"internet":true,"translation":true,"petitions":true,"language":"English","petition":{"langchannel":"","petitionChannel":"","voteChannel":"","voteRequirement":6,"deleteRequirement":6}};

bot.on('ready', () => {
	bot.user.setStatus("online");
	bot.user.setActivity("/help");
	console.log("Bot up.");
	for (var i of bot.guilds) {
		if (bal.config[i[1].id] == undefined) {
			bal.config[i[1].id] = newConfig;
		}
	}
	for (var channel of bot.channels) {
		if (channel[1].id == bal.config[channel[1].guild.id].petition.petitionChannel || channel[1].id == bal.config[channel[1].guild.id].petition.voteChannel) {
			channel[1].fetchMessages();
		}
	}
});

bot.on("guildCreate", guild =>{
	if (bal.config[guild.id] == undefined) {
		bal.config[guild.id] = newConfig;
	}
});

bot.on("message", msg => {
	if (msg.author.bot) {
		if (msg.channel.type != "text") {
			return;
		}
		else {
			if (msg.channel.id != bal.config[msg.guild.id].petition.voteChannel) {
				return;
			}
		}
	}
	if (msg.channel.type == "text") {
		try {
			console.log(msg.author.username + " in #" + msg.channel.name + ", " + msg.guild.name + ": " + msg.content);
			//msg.channel.send(readline.question(""));
			var command;
			var args;
			var module = true;
			for (var m in c) {
				if (msg.content.includes(c[m].config.p)) {
					if (msg.content.indexOf(c[m].config.p) == 0) {
						module = m;
						args = msg.content.slice(c[m].config.p.length).split(/ +/g);
						command = args.shift().toLowerCase();
					}
				}
			}
			if (module == true) {
				if (bal.config[msg.guild.id].internet && Object.keys(bal.internet.channels).includes(msg.channel.id)) {
					msg.delete();
					if (bal.internet.links[msg.guild.id] == undefined) {
						var guildLink = "https://discord.gg/7eYSR9n";
					}
					else {
						var guildLink = bal.internet.links[msg.guild.id];
					}
					if (bal.internet.sites[functions.getSiteOwner(bal.internet.channels[msg.channel.id])].chatLock.locked && bal.internet.sites[functions.getSiteOwner(bal.internet.channels[msg.channel.id])].chatLock.chatChannel != msg.channel.id && !(overriders.includes(msg.author.id))) return;
					if (bal.internet.sites[functions.getSiteOwner(bal.internet.channels[msg.channel.id])].banned.includes(msg.author.id) && !(overriders.includes(msg.author.id))) {
						msg.reply("you're banned from this website!");
						return;
					}
					var toSend = new Discord.RichEmbed({title:msg.author.username + "#" + msg.author.discriminator,description:msg.content,color:msg.member.highestRole.color,url:"https://discord.gg/7eYSR9n",thumbnail:{url:msg.author.avatarURL},author:{name:msg.guild.name + " [#" + msg.channel.name + "]",icon:msg.guild.iconURL,url:guildLink},footer:{text:"Site: " + bal.internet.channels[msg.channel.id],icon:bot.user.avatarURL}});
					if (bal.internet.sites[functions.getSiteOwner(bal.internet.channels[msg.channel.id])].hidden) {
						toSend.setFooter("Site address hidden!", bot.user.avatarURL)
					}
					if (msg.attachments.first() != undefined) {
						toSend.attachFile(msg.attachments.first().url);
					}
					if (overriders.includes(msg.author.id)) {
						toSend.setTitle(toSend.title + " (an overrider)");
					}
					for (var currentChannel of bot.channels) {
						if (bal.internet.channels[currentChannel[1].id] == bal.internet.channels[msg.channel.id]) {
							currentChannel[1].startTyping();
							currentChannel[1].send({embed:toSend});
							currentChannel[1].stopTyping();
						}
					}
				}
				else if (msg.channel.id == bal.config[msg.guild.id].petition.petitionChannel && bal.config[msg.guild.id].petitions) {
					petitionReactions.forEach(function(element){
						msg.react(element);
					});
				}
				else if (msg.channel.id == bal.config[msg.guild.id].petition.voteChannel && bal.config[msg.guild.id].petitions) {
					if (msg.author.id != bot.user.id) {
						additionalVoteReactions = [];
					}
					voteReactions.forEach(function(element){
						msg.react(element);
					});
					additionalVoteReactions.forEach(function(element){
						msg.react(element);
					});
				}
				return;
			}
			else {
				if (command == "help" || command == "?") {
					var output = "Here\'s a list of the commands for the **" + module + "** module.\n\n**Commands that everyone can use**:";
					for (var com in c[module].commands) {
						if (c[module].commands[com].g == "e") {
							output += "\n`" + com;
							if (c[module].commands[com].a.length > 0) {
								output += " [" + c[module].commands[com].a.join("] [") + "]`";
							}
							else {
								output += "`";
							}
							output += " : " + c[module].commands[com].d;
						}
					}
					output += "\n\n**Commands that only people with the administrator permission or a role called \"" + botAdminRoleName + "\" can use**:";
					for (var com in c[module].commands) {
						if (c[module].commands[com].g == "a") {
							output += "\n`" + com;
							if (c[module].commands[com].a.length > 0) {
								output += " [" + c[module].commands[com].a.join("] [") + "]`";
							}
							else {
								output += "`";
							}
							output += " : " + c[module].commands[com].d;
						}
					}
					msg.channel.send(output);
				}
				else if (module == "help" || (bal.config[msg.guild.id][module])) {
					if (c[module].commands[command] != undefined) {
						if (c[module].commands[command].g == "a") {
							if (!(msg.member.hasPermission("ADMINISTRATOR") || overriders.includes(msg.author.id) || msg.member.roles.find("name", botAdminRoleName))) {
								msg.channel.send("You don't have sufficient permissions to use this command!");
								return;
							}
						}
						if (module == "currency") {
							for (var i of bot.guilds) {
							if (bal.currency[i[1].id] == undefined) {
									bal.currency[i[1].id] = {"bank":{},"config":{"sym":"","prefixes.currency":"!","name":i[1].name}}
								}
								for (var n of i[1].members) {
									if (bal.currency[i[1].id].bank[n[1].id] == undefined && !n[1].user.bot) {
										bal.currency[i[1].id].bank[n[1].id] = {"bal":0,"employing":{},"name":n[1].user.username};
									}
								}
							}
							bal.currency[msg.guild.id].name = msg.guild.name;
							if (msg.member.nickname != null) {
								bal.currency[msg.guild.id].bank[msg.author.id]["name"] = msg.member.nickname;
							}
							else {
								bal.currency[msg.guild.id].bank[msg.author.id]["name"] = msg.author.username;
							}
						}
						bal = c[module].commands[command].f(msg,bot,args,bal);
						
					}
					else {
						msg.channel.send("That\'s not a command...");
					}
				}
			}
			fs.writeFile('bal.json', JSON.stringify(bal));
		}
		catch (err) {
			msg.channel.send("Something happened!", new Discord.RichEmbed({title:"Something happened!",description:"Something happened!",author:{name:"Something happened!"},image:{url:"https://cdn.windowsreport.com/wp-content/uploads/2016/02/something-happened.jpg"},footer:{text:"Something happened!"}}));
			console.log(err);
		}
	}
	else {
		if (msg.author.id != "378877253754421250") {
			msg.reply("This bot can only be used in servers!")
		}
	}
});

bot.on("messageReactionAdd", (messageReaction,user) => {
	try {
		console.log(user.username + " reacted on the message: [" + messageReaction.message.content + "] with " + messageReaction.emoji.name)
		if (messageReaction.message.channel.id == bal.config[messageReaction.message.guild.id].petition.petitionChannel && bal.config[messageReaction.message.guild.id].petitions) {
			if (messageReaction.message.guild.channels.has(bal.config[messageReaction.message.guild.id].petition.voteChannel)) {
				if (messageReaction.count >= bal.config[messageReaction.message.guild.id].petition.voteRequirement && messageReaction.emoji.name == "✏") {
					messageReaction.message.delete();
					var timeSent = new Date(messageReaction.message.createdTimestamp);
					if (messageReaction.message.guild.id == DLoNguildID) {
						var toSend = new Discord.RichEmbed({description:messageReaction.message.content,color:messageReaction.message.member.highestRole.color,footer:{text:timeSent}})
					}
					else {
						var toSend = new Discord.RichEmbed({title:messageReaction.message.author.username + "#" + messageReaction.message.author.discriminator,description:messageReaction.message.content,color:messageReaction.message.member.highestRole.color,thumbnail:{url:messageReaction.message.author.avatarURL},footer:{text:timeSent}});
					}
					if (messageReaction.message.attachments.first() != undefined) {
						toSend.attachFile(messageReaction.message.attachments.first().url);
					}
					additionalVoteReactions = [];
					for (var currentEmoji of messageReaction.message.reactions) {
						if (!(petitionReactions.includes(currentEmoji[1].emoji.name))) {
							additionalVoteReactions.push(currentEmoji[1].emoji.name);
						}
					}
					messageReaction.message.guild.channels.get(bal.config[messageReaction.message.guild.id].petition.voteChannel).send("New vote!", {embed:toSend});
					messageReaction.message.author.send("Your petition in " + messageReaction.message.guild.name + " is now a vote:\n" + messageReaction.message.content);
				}
				else if (messageReaction.count >= bal.config[messageReaction.message.guild.id].petition.deleteRequirement && messageReaction.emoji.name == "🗑") {
					messageReaction.message.delete();
					messageReaction.message.author.send("Your petition was deleted in " + messageReaction.message.guild.name + ":\n" + messageReaction.message.content);
					if (messageReaction.message.guild.id == DLoNguildID) {
						var toSend = new Discord.RichEmbed({description:messageReaction.message.content});
						if (messageReaction.message.attachments.first() != undefined) {
							toSend.attachFile(messageReaction.message.attachments.first().url);
						}
						messageReaction.message.guild.channels.find("name", "dead-petitions").send("=(", {embed:toSend});
					}
				}
			}
			else {
				messageReaction.message.channel.send("I don\'t have access to the vote channel!");
			}
		}
		if (messageReaction.message.channel.id == bal.config[messageReaction.message.guild.id].petition.voteChannel && messageReaction.message.guild.id == DLoNguildID) {
			if ((messageReaction.emoji.name == "against" || messageReaction.emoji.name == "favour") && (messageReaction.count > (messageReaction.message.channel.members.keyArray().length - 1) / 2 || messageReaction.count > 7)) {
				messageReaction.message.delete();
				if (messageReaction.message.author.id == bot.user.id) {
					var toSend = new Discord.RichEmbed({description:messageReaction.message.embeds[0].description});
				}
				else {
					var toSend = new Discord.RichEmbed({description:messageReaction.message.content});
				}
				if (messageReaction.message.attachments.first() != undefined) {
					toSend.attachFile(messageReaction.message.attachments.first().url);
				}
				var output = "<@&379355374286798848> Vote decided. Results:\n\n";
				var foundReactions = [];
				for (var reaction of messageReaction.message.reactions) {
					if (!(foundReactions.includes(reaction[1].emoji.toString()))) {
						foundReactions.push(reaction[1].emoji.toString());
						output += reaction[1].emoji.toString() + ": " + (reaction[1].count - 1) + "\n";
					}
				}
				messageReaction.message.guild.channels.find('id', "379354756503568385").send(output, {embed:toSend});
			}
		}
	}
	catch (err) {
		console.log(err);
	}
});

//Login with TOKEN for Bot
bot.login(config.token);
