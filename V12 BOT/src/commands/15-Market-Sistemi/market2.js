const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const dolar = require("../../schemas/dolar")
const serverSettings =require('../../models/sunucuayar')
const ayar = require("../../configs/settings.json")
const { red, green, star } = require("../../configs/emojis.json")
const table = require("table");

module.exports = {
    conf: {
      aliases: ["market2","shop2"],
      name: "market2",
      help: "market2"
    },

 run: async (client, message, embed) => {

  if (!message.guild) return;
  let conf = await serverSettings.findOne({
    guildID: message.guild.id
});

  let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  

  let spotify = new MessageButton()
  .setStyle('green')
  .setLabel("Spotify Premium")
  .setID("ozispotify")
  .setEmoji("941993326700265512")

  let netflix = new MessageButton()
  .setStyle('green')
  .setLabel("Netflix UHD")
  .setID("ozinetflix")
  .setEmoji("941993358518284298")

  let youtube = new MessageButton()
  .setStyle('green')
  .setLabel("Youtube Premium")
  .setID("oziyoutube")
  .setEmoji("941993963013935115")

  let cnitro = new MessageButton()
  .setStyle('green')
  .setLabel("Discord Classic Nitro")
  .setID("ozicnitro")
  .setEmoji("941993712978890752")

  let bnitro = new MessageButton()
  .setStyle('green')
  .setLabel("Discord Boost Nitro")
  .setID("ozibnitro")
  .setEmoji("941993742934614047")

  var çıkış = new MessageButton()
  .setStyle('red')
  .setLabel('Market Çıkış')
  .setID('çıkış')
  .setEmoji("920412153712889877");


 if (dolarData.dolar > 40000) {
    spotify.setStyle('green');
  } else {
    spotify.setStyle('grey').setDisabled(true);
  }

 if (dolarData.dolar > 50000) {
    netflix.setStyle('green');
  } else {
    netflix.setStyle('grey').setDisabled(true);
  }

 if (dolarData.dolar > 60000) {
    youtube.setStyle('green');
  } else {
    youtube.setStyle('grey').setDisabled(true);
  }

 if (dolarData.dolar > 125000) {
    cnitro.setStyle('green');
  } else {
    cnitro.setStyle('grey').setDisabled(true);
  }

 if (dolarData.dolar > 150000) {
    bnitro.setStyle('green');
  } else {
    bnitro.setStyle('grey').setDisabled(true);
  }


   const market = new MessageActionRow()
  .addComponents([ spotify, netflix, youtube ]);

   const market2 = new MessageActionRow()
  .addComponents([ cnitro, bnitro, çıkış ]);


  let urundata = [
        { Id: "1", urunAdi: "Spotify Premium", urunDetayi: "1 Ay", urunFiyati: "40000"},
        { Id: "2", urunAdi: "Netflix UHD", urunDetayi: "1 Ay", urunFiyati: "50000"},
        { Id: "3", urunAdi: "Youtube Premium", urunDetayi: "3 Ay", urunFiyati: "60000"},
        { Id: "4", urunAdi: "Discord Classic Nitro", urunDetayi: "1 Ay", urunFiyati: "125000"},
        { Id: "5", urunAdi: "Discord Boostlu Nitro", urunDetayi: "1 Ay", urunFiyati: "150000"}
    ]

    let urunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       urunler = urunler.concat(urundata.map(value => { 
         let urunfiyatioku = `${value.urunFiyati} 💵`	
          return [
          `#${value.Id}`,
          `${value.urunAdi}`,
          `${value.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))


    let ozi = new MessageEmbed()
.setDescription(`\n🤑 **${message.guild.name}** mağazasına hoş geldin ${message.member}, \nBurada kendine çeşitli eşyalar ve sunucumuz için işine yarayabilecek \nbelirli özelliklerden satın alabilirsin.`)
.addField(`${star} Mağaza (\`Bakiye: ${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0} 💵\`)`,`\`\`\`css
${table.table(urunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,
        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\``)
.addField(`${star} Ürün nasıl satın alabilirim?`,`Aşağıda beliren butonlardan yeşil olanlara \`30 Saniye\` içerisinde tıklayarak satın alabilirsin.`)
   
let jaylen = await message.channel.send(ozi, { components: [market, market2] });
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await jaylen.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

    if (button.id === "ozispotify") {

      let spotify = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Spotify Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter(`Satın Alma İşlemi Başarılı`)
.setTimestamp()
.setAuthor(button.clicker.member.displayName, button.clicker.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(button.clicker.user.displayAvatarURL({ dynamic: true, size: 2048 }))

          client.channels.cache.get(conf.marketLog).send(`${button.clicker.member.toString()} kişisi \`Spotify Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: button.clicker.member.id }, { $inc: { dolar: -40000 } }, { upsert: true });
         
      
      jaylen.edit({components: null, embed: spotify}); 

        }

      if (button.id === "ozinetflix") {

      let netflix = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Netflix UHD\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter(`Satın Alma İşlemi Başarılı`)
.setTimestamp()
.setAuthor(button.clicker.member.displayName, button.clicker.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(button.clicker.user.displayAvatarURL({ dynamic: true, size: 2048 }))

          client.channels.cache.get(conf.marketLog).send(`${button.clicker.member.toString()} kişisi \`Netflix UHD\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: button.clicker.member.id }, { $inc: { dolar: -50000 } }, { upsert: true });
         
      jaylen.edit({components: null, embed: netflix}); 

        }

      if (button.id === "oziyoutube") {

      let youtube = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Youtube Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter(`Satın Alma İşlemi Başarılı`)
.setTimestamp()
.setAuthor(button.clicker.member.displayName, button.clicker.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(button.clicker.user.displayAvatarURL({ dynamic: true, size: 2048 }))

          client.channels.cache.get(conf.marketLog).send(`${button.clicker.member.toString()} kişisi \`Youtube Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: button.clicker.member.id }, { $inc: { dolar: -60000 } }, { upsert: true });

      jaylen.edit({components: null, embed: youtube}); 

        }

       if (button.id === "ozicnitro") {

      let cnitro = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Discord Classic Nitro\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter(`Satın Alma İşlemi Başarılı`)
.setTimestamp()
.setAuthor(button.clicker.member.displayName, button.clicker.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(button.clicker.user.displayAvatarURL({ dynamic: true, size: 2048 }))

          client.channels.cache.get(conf.marketLog).send(`${button.clicker.member.toString()} kişisi \`Classic Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: button.clicker.member.id }, { $inc: { dolar: -125000 } }, { upsert: true });

      jaylen.edit({components: null, embed: cnitro}); 

        }

      if (button.id === "ozibnitro") {

      let bnitro = new MessageEmbed()
.setDescription(`:tada: Tebrikler! Başarıyla \`Discord Nitro Boost\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`)
.setFooter(`Satın Alma İşlemi Başarılı`)
.setTimestamp()
.setAuthor(button.clicker.member.displayName, button.clicker.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(button.clicker.user.displayAvatarURL({ dynamic: true, size: 2048 }))

          client.channels.cache.get(conf.marketLog).send(`${button.clicker.member.toString()} kişisi \`Boostlu Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
         await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: button.clicker.member.id }, { $inc: { dolar: -150000 } }, { upsert: true });

      jaylen.edit({components: null, embed: bnitro}); 

        }

      if (button.id == "çıkış") {
          button.message.delete({ timeout: 1500 });
        }

}
)}

}  