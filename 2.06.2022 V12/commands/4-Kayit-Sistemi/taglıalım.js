const Discord = require("discord.js");
const disbut = require("discord-buttons")
const { red , green } = require("../../configs/emojis.json")

const registerData  = require("../../schemas/registerStats");

module.exports = {
    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım [aç/kapat]",
      owner: true,
    },

  run: async (client, message, args, embed) => {

    let pushaizm = new disbut.MessageButton().setStyle('red').setLabel('Kapat').setID('kapat')
    let rowyizm = new disbut.MessageButton().setStyle('green').setLabel('Aç').setID('aç')

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let data = await registerData.findOne({ guildID: message.guild.id })
    if(!data) new registerData({guildID: message.guild.id, tagMode: false}).save();

if (data && data.tagMode === true) {

  message.channel.send(embed.setDescription(`Bu komut sunucu içerisinde taglı alımı açıp kapatmanıza yarar.
\`\`\`diff
- Taglı alım modu şuan (${data && data.tagMode === true ? `Açık` : `Kapalı`})
\`\`\`
`), { buttons: [pushaizm] }).then(async (msg) => {

  client.on('clickButton', async (button) => {
    
    if(button.id === "kapat") {
        
      data.tagMode = false;
      data.save();
      msg.edit(embed.setDescription(`${green} taglı alım modu başarıyla deaktif edildi!`), {buttons: [pushaizm.setDisabled(true)]})
        
    }
    
    })

})


}

if (data && data.tagMode === false) {
    
      message.channel.send(embed.setDescription(`Bu komut sunucu içerisinde taglı alımı açıp kapatmanıza yarar.
\`\`\`diff
- Taglı alım modu şuan (${data && data.tagMode === true ? `Açık` : `Kapalı`})
\`\`\`
`), { buttons: [rowyizm] }).then(async (msg) => {

  client.on('clickButton', async (button) => {
    
    if(button.id === "aç") {
        
      data.tagMode = true;
      data.save();
      msg.edit(embed.setDescription(`${green} taglı alım modu başarıyla aktif edildi!`), {buttons: [rowyizm.setDisabled(true)]})
        
    }
    
    })


})

}
    
}
}