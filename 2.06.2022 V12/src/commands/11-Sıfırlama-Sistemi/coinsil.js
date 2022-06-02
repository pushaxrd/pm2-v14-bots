const coin = require("../../schemas/coin");
const moment = require("moment")
moment.locale("tr");
const { red , green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["coinsıfırla","cointemizle"],
    name: "coinsil",
    help: "coinsil",
  },

  run: async (client, message, args, embed, prefix) => {
if (!message.member.hasPermission('ADMINISTRATOR'))
{
message.lineReply("Bu işlemi yapamazsın dostum!").then(x=>x.delete({timeout: 5000}))
message.react(red)
return;
}
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member)
{
message.lineReply("coin sıfırlamamı istediğin kişiyi etiketle!").then(x=>x.delete({timeout:5000}))
message.react(red)
return;
}
const coinData = await coin.findOne({userID: member.user.id, guildID: message.guild.id})
if(!coinData)
{
message.react(red)
message.lineReply(`${member} kişisinin coini zaten yok!`)
return;
}
message.react(green)
message.lineReply(`${green} ${member} üyesinin coini ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)
await coin.deleteMany({})
}
};