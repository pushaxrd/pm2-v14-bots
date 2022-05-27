const Canvas = require("canvas")

let setting = require("../../configs/settings.json");
const serverSettings = require('../../models/sunucuayar')

const { Mute2, Unmute } = require("../../configs/emojis.json");

 
module.exports = {
  conf: {
    aliases: ["ship"],
    name: "ship",
    help: "ship"
  },

  run: async (client, message, args, embed) => {

    let settings = await serverSettings.findOne({
      guildID: setting.guildID
  });

    const sayı = Math.floor(Math.random() * 100);

    let mesaj;
    if (sayı > 75 && sayı < 100) mesaj = `❤️ 🔥 Siz çok yakıştınız sanki ? (**%${sayı}**)`
    if (sayı > 50 && sayı < 75) mesaj = `😉 Yani fazla şey demimde bi deneyin yani (**%${sayı}**)`
    if (sayı > 0 && sayı < 50) mesaj = `🤮 Sizden olmaz başkasını dene valla. (**%${sayı}**)`

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d")
    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/731112308134248469/949078364445081620/hearts.png")
    ctx.drawImage(bg, 0, 0, 700, 250)
    ctx.font = "75px Sans-serif"
    ctx.fillStyle = "#f0f0f0"

    const messageAuthor = await Canvas.loadImage(message.author.displayAvatarURL({ format: "png" }))
    ctx.drawImage(messageAuthor, 100, 25, 200, 200)

    const heart = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787002826762/zadekalp.png")
    const broken = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787678093342/zadekirikkalp.png")
    const think = await Canvas.loadImage("https://cdn.discordapp.com/attachments/731112308134248469/949237394736037938/thnk.png")

    if (settings.erkekRolleri.some(x => message.member.roles.cache.has(x))) {

      const member = message.guild.members.cache.filter(uye => settings.kizRolleri.some(x => uye.roles.cache.has(x))).random()


      ctx.drawImage(targetMention, 400, 25, 200, 200)



      if (sayı > 75 && sayı > 100) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
          .setDescription(`${mesaj}`)
          .setImage(`attachment://hearts.png`)
          .setColor('RANDOM')
        message.channel.send(`<@${member.id}>`, { embed })
        return
      }

      if (sayı > 50 && sayı < 75) {
        ctx.drawImage(think, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
          .setDescription(`${mesaj}`)
          .setImage(`attachment://hearts.png`)
          .setColor('RANDOM')
          .attachFiles([attachment]);
        message.channel.send(`<@${member.id}>`, { embed })
        return
      }

      if (sayı > 0 && sayı < 50) {
        ctx.drawImage(broken, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
          .setDescription(`${mesaj}`)
          .setImage(`attachment://hearts.png`)
          .setColor('RANDOM')
        message.channel.send(`<@${member.id}>`, { embed })
        return;
      }
    } else if (settings.kizRolleri.some(x => message.member.roles.cache.has(x))) {

      const member = message.guild.members.cache.filter(uye => settings.erkekRolleri.some(x => uye.roles.cache.has(x))).random()

      const targetMention = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png" }))
      ctx.drawImage(targetMention, 400, 25, 200, 200)

      if (sayı > 75 && sayı > 100) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
          .setDescription(`${mesaj}`)
          .setImage(`attachment://hearts.png`)
          .setColor('RANDOM')
        message.channel.send(`<@${member.id}>`, { embed })
        return
      }

      if (sayı > 50 && sayı < 75) {
        ctx.drawImage(think, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
          .setDescription(`${mesaj}`)
          .setImage(`attachment://hearts.png`)
          .setColor('RANDOM')
        message.channel.send(`<@${member.id}>`, { embed })
        return
      }

      if (sayı > 0 && sayı < 50) {
        ctx.drawImage(broken, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
          .setDescription(`${mesaj}`)
          .setImage(`attachment://hearts.png`)
          .setColor('RANDOM')
        message.channel.send(`<@${member.id}>`, { embed })
        return;
      }
    }

  }
}