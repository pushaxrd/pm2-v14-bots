const moment = require("moment");
moment.locale("tr");
const { MessageEmbed } = require("discord.js");
const snipe = require("../schemas/snipe");

const config = require("../configs/sunucuayar.json")


module.exports = async (message) => {
  

  if (message.author.bot) return;

  await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $set: { messageContent: message.content, userID: message.author.id, image: message.attachments.first() ? message.attachments.first().proxyURL : null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
  const embed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setTitle(`${message.channel.name} adlı kanalda bir mesaj silindi!`)
    .setDescription(message.content)
    .setFooter(`ID: ${message.author.id} • ${moment().calendar()}`);
  
  if (message.attachments.first()) embed.setImage(message.attachments.first().proxyURL);
  client.channels.cache.get(client.channels.cache.find(x => x.name == "messagelogchannel").id).wsend(embed)
};

module.exports.conf = {
  name: "messageDelete",
};
