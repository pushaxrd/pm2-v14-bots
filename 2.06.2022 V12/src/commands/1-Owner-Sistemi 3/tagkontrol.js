const { green, red } = require("../../configs/emojis.json")
const settings = require("../../configs/settings.json");
const serverSettings = require('../../models/sunucuayar')

module.exports = {
    conf: {
      aliases: ["kontrol","check"],
      name: "kontrol",
      help: "kontrol"
    },
  
    run: async (client, message, args, embed) => {

      let conf = await serverSettings.findOne({
        guildID: settings.guildID
    });

      let tag = conf.tag
      let rol = conf.ekipRolu
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol))
      taglilar.array().forEach(async(member, index) => {
      setTimeout(async() => {
      if(member.user.bot) return
      await member.roles.add(rol)
      }, index * 1000)
      })
      let toplam = taglilar.size 
      if(toplam === 0) {
      message.lineReply(` Hata : Herkesin rolleri dağıtılmış!`).sil(20)
      } else {
      embed.setDescription(`
      ${green} Başarılı! **${toplam}** Adet kullanıcıya taglı rolü verilecek!
      `)
      message.lineReply(embed) 
    }
          },
    };
    
    
  
  