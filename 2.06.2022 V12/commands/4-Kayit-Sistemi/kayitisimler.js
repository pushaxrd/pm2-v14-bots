const nameData = require("../../schemas/names")
const {red, green } = require("../../configs/emojis.json")
const moment = require("moment")
moment.locale("tr")

const serverSettings =require('../../models/sunucuayar')


module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    help: "isimler [kullanıcı]"
  },


  run: async (client, message, args, embed, prefix) => { 
    if (!message.guild) return;
  let ayar = await serverSettings.findOne({
    guildID: message.guild.id
});

    if(!ayar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
    message.react(red)
    message.lineReply(`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`).then(x=> x.delete({timeout: 5000})) 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });
    embed.setColor("#2f3136")
    embed.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }));
    message.lineReply(embed.setDescription(`
<@${member.user.id}> kişisinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu.

${data ? data.names.splice(0, 3).map((x, i) => `\`${x.name}\` (${x.rol}) (<@${x.yetkili}>)`).join("\n") : "Daha önce kayıt olmamış."}`));
  }
};