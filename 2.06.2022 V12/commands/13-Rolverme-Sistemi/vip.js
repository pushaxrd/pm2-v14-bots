const { red , green} = require("../../configs/emojis.json")
const serverSettings = require('../../models/sunucuayar')
const settings = require("../../configs/settings.json")

module.exports = {
  conf: {
    aliases: ["vip","special"],
    name: "vip",
    help: "vip",
  },

  run: async (client, message, args, embed, prefix) => {
    
    let conf = await serverSettings.findOne({
      guildID: settings.guildID
  });

if (!message.member.hasPermission("ADMINISTRATOR") &&  !conf.VipHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
const user =message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!user) { message.channel.send( "Böyle bir kullanıcı bulunamadı!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
if(!user.roles.cache.has(conf.vipRole)) 
{
user.roles.add(conf.vipRole)
message.lineReply(`${green} Başarılı! ${user} kişisine başarılı bir şekilde \`Vip\` rolü verildi!`).then(x=>x.delete({timeout:5000}))
} else {
user.roles.remove(conf.vipRole)
message.lineReply(`${green} Başarılı! ${user} kişisinden başarılı bir şekilde \`Vip\` rolü alındı!`).then(x=>x.delete({timeout:5000}))
}
}
};