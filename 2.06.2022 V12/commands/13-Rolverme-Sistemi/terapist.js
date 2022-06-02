const { red , green} = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["terapist","tp"],
    name: "terapist",
    help: "terapist",
  },

  run: async (client, message, args, embed, prefix) => {
if (!message.member.hasPermission("ADMINISTRATOR") &&  !conf.rolverici.some(x => message.member.roles.cache.has(x))) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
const user =message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!user) { message.channel.send( "Böyle bir kullanıcı bulunamadı!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
if(!user.roles.cache.has(conf.terapist)) 
{
user.roles.add(conf.terapist)
message.lineReply(`${green} Başarılı! ${user} kişisine başarılı bir şekilde \`Terapist\` rolü verildi!`).then(x=>x.delete({timeout:5000}))
} else {
user.roles.remove(conf.terapist)
message.lineReply(`${green} Başarılı! ${user} kişisinden başarılı bir şekilde \`Terapist\` rolü alındı!`).then(x=>x.delete({timeout:5000}))
}
}
};