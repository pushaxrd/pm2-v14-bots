const Canvas = require("canvas")
const Discord = require('discord.js')
const disbut = require("discord-buttons");
const { MessageEmbed, Message } = require('discord.js')

const server = require("../../schemas/registerStats");
const serverSettings =require('../../models/sunucuayar')



module.exports = {
  conf: {
    aliases: ["kilit"],
    name: "kilit",
    help: "kilit",
  },

  run: async (client, message, args) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

    var kilit = new disbut.MessageButton()
    .setEmoji("🔒").setStyle('green')
    .setLabel('Kilit')
    .setID('kilit')
 
    var registerkilit = new disbut.MessageButton()
    .setEmoji("🔒")
    .setStyle('green')
    .setLabel('Register Kilit')
    .setID('registerkilit')
 
    var iptal = new disbut.MessageButton()
    .setStyle('red')
    .setLabel('İptal')
    .setID('iptal')

    let embed = new Discord.MessageEmbed()
      .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setColor("RANDOM")
      .setDescription(`
    Bu kanal şuan: ${message.channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') ? "Açık" : "Kapalı"}
    \`\`\`Komutu kullandığınız kanalın kilitlenmesini/açılmasını istiyorsanız: Kanal Kilit butonunu kullanın.\`\`\` 
    Register sistemi şuan: ${server.RegisterSystem ? "Açık" : "Kapalı"}
    \`\`\`Register voice kanallarının ve register sisteminin kilitlenmesini/açılmasını istiyorsanız: Register Kilit butonunu kullanın.\`\`\`
    `)

    let msg = await message.channel.send(embed, { buttons: [kilit, registerkilit, iptal] })

    var filter = (button) => button.clicker.user.id === message.author.id;
    
    let collector = await msg.createButtonCollector(filter, { time: 30000 })
    

    let channels = message.guild.channels.cache.filter(ch => ch.parentID == "945760986411991143")

    collector.on("collect", async (button) => {
      
      if (button.id === "kilit") {
       
        if (message.channel.permissionsFor(message.guild.id).has('SEND_MESSAGES')) {
          message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
          }).then(async () => {
            await message.channel.send("Kanal başarıyla kilitlendi.")
         
            })
          
        } else {
          message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
          }).then(async () => { 
            await message.channel.send("Kanal kilidi açıldı.")
          })
        }
      
      } else if (button.id === "registerkilit") {

        if (server.RegisterSystem) {
          server.RegisterSystem = false;
          channels.forEach(ch => {
          message.channel.updateOverwrite(`${conf.unregRoles}`, {
              SEND_MESSAGES: false,
              CONNECT: false
            });
          });
          message.channel.send("Başarıyla register voice kanalları ve sistemi kilitlendi")
        } else {

          server.RegisterSystem = true;

          channels.forEach(ch => {
          message.channel.updateOverwrite(`${conf.unregRoles}`, {
              SEND_MESSAGES: true,
              CONNECT: true
            });
          });
          message.channel.send("Başarıyla register voice kanalları ve sistemi açıldı")
        }
      } else if (button.customId === "iptal") {
     
        msg = await message.channel.send(embed, { buttons: [
          kilit.setDisabled(true), 
          registerkilit.setDisabled(true), 
          iptal.setDisabled(true)] 
        })
        message.channel.send("İşlem iptal edildi.")

      }
    })

    collector.on('end', async () => {

       msg = await message.channel.send(embed, { buttons: [
        kilit.setDisabled(true), 
        registerkilit.setDisabled(true), 
        iptal.setDisabled(true)] 
      })



    })


  }

}