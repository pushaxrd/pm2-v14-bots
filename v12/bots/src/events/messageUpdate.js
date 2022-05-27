const moment = require("moment");
moment.locale("tr");

const { MessageEmbed } = require("discord.js");

module.exports = async (oldMessage, newMessage) => {



  if (oldMessage.author.bot) return;

 
  const embed = new MessageEmbed()
    .setAuthor(newMessage.member.displayName, newMessage.author.avatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setTitle(`${newMessage.channel.name} adlı kanalda bir mesaj düzenlendi!`)
    .setDescription(`- ${oldMessage.content} \n+ ${newMessage.content}`)
    .setFooter(`ID: ${newMessage.author.id} • ${moment().add(3, "hours").calendar()}`);

  if (newMessage.attachments.first()) embed.setImage(newMessage.attachments.first().proxyURL);
  client.channels.cache.get(client.channels.cache.find(x => x.name == "messagelogchannel").id).wsend(embed)
};

module.exports.conf = {
  name: "messageUpdate",
};
