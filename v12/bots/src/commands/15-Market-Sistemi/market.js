const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const dolar = require("../../schemas/dolar")
const serverSettings =require('../../models/sunucuayar')
const ayar = require("../../configs/settings.json")
const { red, green, rewards } = require("../../configs/emojis.json")



module.exports = {
    conf: {
      aliases: ["market","shop"],
      name: "market",
      help: "market"
    },

 run: async (client, message) => {

  if (!message.guild) return;
  let conf = await serverSettings.findOne({
    guildID: message.guild.id
});

  let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  

  let spotify = new disbut.MessageMenuOption()
  .setLabel("Ürün : Spotify Premium")
  .setValue("pushaspotify")
  .setEmoji("924625735166087258")
  .setDescription("💳 Fiyat : 40.000 💰")

  let netflix = new disbut.MessageMenuOption()
  .setLabel("Ürün : Netflix UHD")
  .setValue("pushanetflix")
  .setEmoji("924625730036445215")
  .setDescription("💳 Fiyat : 50.000 💰")

  let exxen = new disbut.MessageMenuOption()
  .setLabel("Ürün : Exxen Premium")
  .setValue("pushaexxen")
  .setEmoji("924625736118202390")
  .setDescription("💳 Fiyat : 60.000 💰")

  let blutv = new disbut.MessageMenuOption()
  .setLabel("Ürün : Blu Tv 1 Y")
  .setValue("pushablutv")
  .setEmoji("924625727272419328")
  .setDescription("💳 Fiyat : 125.000 💰")

  let nitro = new disbut.MessageMenuOption()
  .setLabel("Ürün : Nitro")
  .setValue("pushanitro")
  .setEmoji("924625727553429524")
  .setDescription("💳 Fiyat : 150.000 💰")


  let market = new disbut.MessageMenu()
  .setID("market")
  .setPlaceholder(`Ürünlerimizi listelemek için tıklayın.`)
  .addOption(spotify)
  .addOption(netflix)
  .addOption(exxen)
  .addOption(blutv)
  .addOption(nitro)


   const MenuMessage = await message.channel.send(`:tada: **${message.guild.name} Mağazasına Hoşgeldiniz!**
💰 Dolarınız : **${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0}**
   `, market);
  
   const filter = (menu) => menu.clicker.user.id === message.author.id;
   const Collector = MenuMessage.createMenuCollector(filter, { time: 9999999 });


   Collector.on("collect", async (menu) => {

  let dolarData = await dolar.findOne({ guildID: ayar.guildID, userID: menu.clicker.user.id });  

    if (menu.values[0] === "pushaspotify") {

      if(40000 > dolarData.dolar) 
      {
       menu.reply.send("\`Spotify Premium\` ürününü almak için **Dolar**'ın yetersiz!", true)
          return
      }
       menu.reply.send(":tada: Tebrikler! Başarıyla \`Spotify Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!", true)
       client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Spotify Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
      await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -40000 } }, { upsert: true });
    }
    


  if (menu.values[0] === "pushanetflix") {

    if(50000 > dolarData.dolar) 
    {
        menu.reply.send("\`Netflix UHD\` ürününü almak için **Dolar**'ın yetersiz!", true)
        return
    }
        menu.reply.send(":tada: Tebrikler! Başarıyla \`Netflix UHD\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!", true)
     client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Netflix UHD\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
    await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -50000 } }, { upsert: true });
  }
  
  

  if (menu.values[0] === "pushaexxen") {

    if(60000 > dolarData.dolar) 
    {
        menu.reply.send("\`Exxen\` ürününü almak için **Dolar**'ın yetersiz!", true)
        return
    }
        menu.reply.send(":tada: Tebrikler! Başarıyla \`Exxen\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!", true)
    client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Exxen\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
    await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -60000 } }, { upsert: true });
  }
  
  

if (menu.values[0] === "pushablutv") {

  if(125000 > dolarData.dolar) 
  {
      menu.reply.send("\`Blu Tv\` ürününü almak için **Dolar**'ın yetersiz!", true)
      return
  }
      menu.reply.send(":tada: Tebrikler! Başarıyla \`Blu Tv\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!", true)
   client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Blu tv \` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
  await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -125000 } }, { upsert: true });
}



if (menu.values[0] === "pushanitro") {

  if(150000 > dolarData.dolar) 
  {
      menu.reply.send("\`Nitro\` ürününü almak için **Dolar**'ın yetersiz!", true)
      return
  }
      menu.reply.send(":tada: Tebrikler! Başarıyla \`Nitro\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!", true)
   client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
  await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -150000 } }, { upsert: true });
}

});

},
}