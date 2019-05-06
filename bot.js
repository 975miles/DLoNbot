const Discord = require("discord.js");
const bot = new Discord.Client({
	autoReconnect: true
});
const requireDir = require('require-dir');
const fs = require('fs');
/**
 * @type {Object.<string, Object.<string, {config: {p: string, d: string}, commands: Object.<string, {d: string, a: string[], g: "e" | "a" | "o", f: Function>>>}}}
 */
var modules = requireDir("./commands", {
	recurse: true
});
var functions = requireDir("./functions", {
	recurse: true
});
/**
 * @type {Object<string, any>}
 */
var bal = require("./bal.json");
/**
 * @type {Object<string, any>}
 */
var config = require("./config.json");
/**
 * @type {Object<string, string>}
 */
var reactions = require("./reactions.json");

var needsAdminResponse = "go get admin";

var botAdminRoleName = "Mynezia bot controller";
var petitionReactions = ["✏", "🗑"];
var voteReactions = ["417376041586393088", "417376041573679104", "417376041544318976"];
var additionalVoteReactions = [];
var petitionChannelName = "petitions";
var voteChannelName = "votes";
var DNTOguildID = "417326960776183813";
var newConfig = {
	"language": "English",
	"petition": {
		"langchannel": "",
		"petitionChannel": "",
		"voteChannel": "",
		"voteRequirement": 6,
		"deleteRequirement": 6
	}
};

//On ready, make us o n l i n e and fetch all the messages for petition & vote channels. Also, make sure all the configs are not undefined.
bot.on('ready', async () => {
	bot.user.setStatus("online");
	bot.user.setActivity("/help");
	console.log("Bot up.");
	for (var guild of bot.guilds) {
		if (bal.config[guild[1].id] == undefined) {
			bal.config[guild[1].id] = newConfig;
		}
	}
	for (var channel of bot.channels) {
		if (channel[1].type == "text" && channel[1].id == bal.config[channel[1].guild.id].petition.petitionChannel || channel[1].type == "text" && channel[1].id == bal.config[channel[1].guild.id].petition.voteChannel) {
			channel[1].fetchMessages();
		}
	}
});

//Making sure config is not undefined for new guilds
bot.on("guildCreate", guild => {
	if (bal.config[guild.id] == undefined) {
		bal.config[guild.id] = newConfig;
	}
});

bot.on("message", async msg => {
	//If the person is blacklisted then game end them
	if (bal.config.blacklisted.includes(msg.author.id)) return;
	//We only want to handle our own messages if they're in a vote channel
	if (msg.author.id == bot.user.id) {
		if (msg.channel.type != "text") {
			return;
		} else {
			if (msg.channel.id != bal.config[msg.guild.id].petition.voteChannel) {
				return;
			}
		}
	}

	//By default, enables all modules
	for (var settingi in bal.config) {
		for (var cmdi in modules) {
			if (bal.config[settingi][cmdi] == undefined) {
				bal.config[settingi][cmdi] = true;
			}
		}
	}

	//Bot can only be used in servers. Sorry, DMers.
	if (msg.channel.type != "text") {
		if (msg.author.id != bot.user.id) {
			msg.reply("This bot can only be used in servers!")
		}
	}

	//We wouldn't want to crash, would we?
	try {
		//Simple logging
		console.log(msg.author.username + " in #" + msg.channel.name + ", " + msg.guild.name + ": " + msg.content);
		/**
		 * Current command.
		 * @type {string}
		 */
		var command;
		/**
		 * Also contains the current command.
		 * @type {string[]}
		 */
		var args;
		/**
		 * The current module; true if there were no matches for the message.
		 * @type {string|boolean}
		 */
		var module = true;
		//For each module in commands: if the message starts with the prefix, then set module accordingly. Also set command and args.
		for (var cmdKey in modules) {
			//If it starts with the command prefix
			if (msg.content.startsWith(modules[cmdKey].config.p)) {
				module = cmdKey;
				args = msg.content.slice(modules[cmdKey].config.p.length).split(/ +/g);
				command = args.shift().toLowerCase();
			}
		}

		// For each reaction trigger, check if message contains the trigger then react accordingly. 
		for (var reactionTrigger in reactions) {
			if (msg.content.toLowerCase().includes(reactionTrigger)) {
				msg.react(reactions[reactionTrigger]);
			}
		}

		//If command didn't match
		if (module == true) {
			//Handle internet
			if (bal.config[msg.guild.id].internet && Object.keys(bal.internet.channels).includes(msg.channel.id)) {
				msg.delete();
				/*if (bal.internet.links[msg.guild.id] == undefined) {
					var guildLink = "https://discord.gg/7eYSR9n";
				} else {
					var guildLink = bal.internet.links[msg.guild.id];
				}*/
				let siteOwner = functions.getSiteOwner(bal.internet.channels[msg.channel.id]);
				//If the site is locked, abort ***but*** if we're in the specified chat channel and the owner or an overidder is speaking then continue.
				if (
					bal.internet.sites[siteOwner].chatLock.locked && 
					bal.internet.sites[siteOwner].chatLock.chatChannel != msg.channel.id && 
					!(config.overriders.includes(msg.author.id) || 
					siteOwner == msg.author.id)
				) return;
				//If you're banned from this site, then abort
				if (bal.internet.sites[siteOwner].banned.includes(msg.author.id) && !(config.overriders.includes(msg.author.id))) {
					msg.reply("you're banned from this website!");
					return;
				}
				//Make a new internet embed
				var toSend = new Discord.RichEmbed({
					title: msg.author.username + "#" + msg.author.discriminator + "<@" + msg.author.id + ">",
					description: msg.content,
					color: (msg.member.highestRole.color ? msg.member.highestRole.color : 0),
					url: "https://discord.gg/7eYSR9n",
					thumbnail: {
						url: msg.author.avatarURL
					}/*,
						author: {
							name: msg.guild.name + " [#" + msg.channel.name + "]",
							icon: msg.guild.iconURL,
							url: guildLink
						},
						footer: {
							text: "Site: " + bal.internet.channels[msg.channel.id],
							icon: bot.user.avatarURL
						}*/
				});
				toSend.setAuthor(msg.guild.name + " [#" + msg.channel.name + "]", msg.guild.iconURL);
				toSend.setFooter("Site: " + bal.internet.channels[msg.channel.id], bot.user.avatarURL)


				if (bal.internet.sites[siteOwner].hidden) {
					toSend.setFooter("Site address hidden!", bot.user.avatarURL)
				}

				if (msg.attachments.first() != undefined) {
					toSend.attachFile(msg.attachments.first().url);
				}
				if (config.overriders.includes(msg.author.id)) {
					toSend.setTitle(toSend.title + " (an overrider)");
				}
				if (siteOwner == msg.author.id) {
					toSend.setTitle(toSend.title + " [site owner]");
				}
				//Send to all channels.
				for (var currentChannel of bot.channels) {
					if (bal.internet.channels[currentChannel[1].id] == bal.internet.channels[msg.channel.id]) {
						currentChannel[1].startTyping();
						currentChannel[1].send({
							embed: toSend
						});
						currentChannel[1].stopTyping();
					}
				}
			//Handle petitions
			} else if (msg.channel.id == bal.config[msg.guild.id].petition.petitionChannel && bal.config[msg.guild.id].petitions) {
				let toSend = new Discord.RichEmbed()
					.setAuthor(msg.author.tag, msg.author.avatarURL)
					.setDescription(msg.content)
					.setTimestamp();
				msg.delete();
				let newPetition = await msg.channel.send(toSend);
				petitionReactions.forEach(async function (element) {
					await newPetition.react(element);
				});
			//Handle votes
			} else if (msg.channel.id == bal.config[msg.guild.id].petition.voteChannel && bal.config[msg.guild.id].petitions) {
				if (msg.author.id != bot.user.id) additionalVoteReactions = [];
				voteReactions.forEach(reaction => msg.react(reaction));
				additionalVoteReactions.forEach(reaction => msg.react(reaction));
			}
			return;
		//Handle basic commands
		} else {
			//Handle help
			if (command == "help" || command == "?") {
				var output = "Here\'s a list of the commands for the **" + module + "** module.\n\n**Commands that everyone can use**:";
				for (var com in modules[module].commands) {
					if (modules[module].commands[com].g == "e") {
						output += "\n`" + com;
						if (modules[module].commands[com].a.length > 0) {
							output += " [" + modules[module].commands[com].a.join("] [") + "]`";
						} else {
							output += "`";
						}
						output += " : " + modules[module].commands[com].d;
					}
				}
				output += "\n\n**Commands that only people with the administrator permission or a role called \"" + botAdminRoleName + "\" can use**:";
				for (var com in modules[module].commands) {
					if (modules[module].commands[com].g == "a") {
						output += "\n`" + com;
						if (modules[module].commands[com].a.length > 0) {
							output += " [" + modules[module].commands[com].a.join("] [") + "]`";
						} else {
							output += "`";
						}
						output += " : " + modules[module].commands[com].d;
					}
				}
				output += "\n\n**Commands that only set overriders can use**:";
				for (var com in modules[module].commands) {
					if (modules[module].commands[com].g == "o") {
						output += "\n`" + com;
						if (modules[module].commands[com].a.length > 0) {
							output += " [" + modules[module].commands[com].a.join("] [") + "]`";
						} else {
							output += "`";
						}
						output += " : " + modules[module].commands[com].d;
					}
				}
				msg.channel.send(output);
			//If the module is help or module is enabled
			} else if (module == "help" || bal.config[msg.guild.id][module]) {
				//If the command exists
				if (modules[module].commands[command] != undefined) {
					//a = admin, o = overrider, e = everyone
					if (modules[module].commands[command].g == "a") {
						if (!(msg.member.hasPermission("ADMINISTRATOR") || config.overriders.includes(msg.author.id) || msg.member.roles.find("name", botAdminRoleName))) {
							msg.channel.send("You don't have sufficient permissions to use this command!");
							return;
						}
					} else if (modules[module].commands[command].g == "o") {
						if (!(config.overriders.includes(msg.author.id))) {
							msg.channel.send("You don't have sufficient permissions to use this command!");
							return;
						}
					}
					//Currency module
					if (module == "currency") {
						//Make sure nothing is undefined
						for (var i of bot.guilds) {
							if (bal.currency[i[1].id] == undefined) {
								bal.currency[i[1].id] = {
									"bank": {},
									"config": {
										"sym": "",
										"mineValue": 0,
										"name": i[1].name
									}
								}
							}
							for (var n of i[1].members) {
								if (bal.currency[i[1].id].bank[n[1].id] == undefined && !n[1].user.bot) {
									bal.currency[i[1].id].bank[n[1].id] = {
										"bal": 0,
										"employing": {},
										"name": n[1].user.username
									};
								}
							}
						}
						//Set the economy name to the guild's name
						bal.currency[msg.guild.id].name = msg.guild.name;
						//In the local bank, check and make sure that their name is correct.
						if (msg.member.nickname != null) {
							bal.currency[msg.guild.id].bank[msg.author.id]["name"] = msg.member.nickname;
						} else {
							bal.currency[msg.guild.id].bank[msg.author.id]["name"] = msg.author.username;
						}
					//Mining module
					} else if (module == "mining") {
						//Make sure nothing is undefined
						if (bal.mining[msg.author.id] == undefined) {
							bal.mining[msg.author.id] = {
								"minerals": {},
								"money": 0,
								"shiftsCompleted": 0,
								"nextShift": 0
							};
							config.monthOrder.forEach(function (element) {
								bal.mining[msg.author.id].minerals[element] = 0;
							});
						}
					}
					//Run the command.
					bal = modules[module].commands[command].f(msg, bot, args, bal);

				} else {
					msg.channel.send("That\'s not a command...").then(msg => setTimeout(function () { msg.delete() }, 2500));
				}
			}
		}
		//Save the modified data.
		fs.writeFile('bal.json', JSON.stringify(bal), null, 4);
	} catch (error) {
		msg.channel.send("Something happened!", new Discord.RichEmbed({
			title: "Something happened!",
			description: "Something happened!",
			author: {
				name: "Something happened!"
			},
			image: {
				url: "https://cdn.windowsreport.com/wp-content/uploads/2016/02/something-happened.jpg"
			},
			footer: {
				text: "Something happened! - " + error.toString()
			}
		}));
		console.log(err);
	}
});

//Hande new reaction
bot.on("messageReactionAdd", (messageReaction, user) => {
	//Abort if blacklisted
	if (bal.config.blacklisted.includes(messageReaction.message.author.id)) return;
	try {
		//Repeat reaction
		messageReaction.message.react(messageReaction.emoji.identifier);
		//Log reaction
		console.log(user.username + " reacted on the message: [" + messageReaction.message.content + "] with " + messageReaction.emoji.name)
		//If it's in a petition channel and petitions are enabled
		if (messageReaction.message.channel.id == bal.config[messageReaction.message.guild.id].petition.petitionChannel && bal.config[messageReaction.message.guild.id].petitions) {
			//And the votechannel exists
			if (messageReaction.message.guild.channels.has(bal.config[messageReaction.message.guild.id].petition.voteChannel)) {
				//If the vote reaction has reached its limit
				if (messageReaction.count >= bal.config[messageReaction.message.guild.id].petition.voteRequirement && messageReaction.emoji.name == "✏") {
					//Delete it
					messageReaction.message.delete();
					var timeSent = new Date(messageReaction.message.createdTimestamp);
					//Make a new embed
					if (messageReaction.message.guild.id == DNTOguildID) {
						var toSend = new Discord.RichEmbed({
							description: messageReaction.message.content == "" ? messageReaction.message.embeds[0].description : messageReaction.message.content,
							color: messageReaction.message.member.highestRole.color,
							footer: {
								text: timeSent
							}
						})
					} else {
						var toSend = new Discord.RichEmbed({
							title: messageReaction.message.author.username + "#" + messageReaction.message.author.discriminator,
							description: messageReaction.message.content == "" ? messageReaction.message.embeds[0].description : messageReaction.message.content,
							color: messageReaction.message.member.highestRole.color,
							thumbnail: {
								url: messageReaction.message.author.avatarURL
							},
							footer: {
								text: timeSent
							}
						});
					}
					//Attach files
					if (messageReaction.message.attachments.first() != undefined) {
						toSend.attachFile(messageReaction.message.attachments.first().url);
					}
					//If there were any additional reactions to the message, add them to the newly sent vote.
					additionalVoteReactions = [];
					for (var currentEmoji of messageReaction.message.reactions) {
						if (!(petitionReactions.includes(currentEmoji[1].emoji.name))) {
							additionalVoteReactions.push(currentEmoji[1].emoji.name);
						}
					}
					// Send new message
					messageReaction.message.guild.channels.get(bal.config[messageReaction.message.guild.id].petition.voteChannel).send("New vote!", {
						embed: toSend
					});
					// DM User
					messageReaction.message.author.send("Your petition in " + messageReaction.message.guild.name + " is now a vote:\n" + messageReaction.message.content);
				// If deletion limit has been reached
				} else if (messageReaction.count >= bal.config[messageReaction.message.guild.id].petition.deleteRequirement && messageReaction.emoji.name == "🗑") {
					// Delete message
					messageReaction.message.delete();
					// DM User
					messageReaction.message.author.send("Your petition was deleted in " + messageReaction.message.guild.name + ":\n" + messageReaction.message.content);
					// Send to dead petitions
					if (messageReaction.message.guild.id == DNTOguildID) {
						var toSend = new Discord.RichEmbed({
							description: messageReaction.message.content
						});
						if (messageReaction.message.attachments.first() != undefined) {
							toSend.attachFile(messageReaction.message.attachments.first().url);
						}
						messageReaction.message.guild.channels.find("name", "dead-petitions").send("=(", {
							embed: toSend
						});
					}
				}
			} else {
				messageReaction.message.channel.send("I don\'t have access to the vote channel!");
			}
				
		}
		// Special shit for DNTO that I really don't want to go through as I'm literally almost to the end of the file omfg
		if (messageReaction.message.channel.id == bal.config[messageReaction.message.guild.id].petition.voteChannel && messageReaction.message.guild.id == DNTOguildID) {
			if (user.id == bot.user.id) return;
			/*if (!messageReaction.message.guild.members.get(user.id).roles.exists("name", "Leader")) {
				messageReaction.remove(user.id);
				return;
			}*/
			if ((messageReaction.emoji.name == "against" || messageReaction.emoji.name == "favour") && (messageReaction.count > (messageReaction.message.channel.members.keyArray().length - 1) / 2 || messageReaction.count > 7)) {
				messageReaction.message.delete();
				if (messageReaction.message.author.id == bot.user.id) {
					var toSend = new Discord.RichEmbed({
						description: messageReaction.message.embeds[0].description
					});
				} else {
					var toSend = new Discord.RichEmbed({
						description: messageReaction.message.content
					});
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
				messageReaction.message.guild.channels.find("name", "vote-results").send(output, {
					embed: toSend
				});
			}
		}
	} catch (err) {
		console.log(err);
	}
});

//Login with TOKEN for Bot
bot.login(config.token);
