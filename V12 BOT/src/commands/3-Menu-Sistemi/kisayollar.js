const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const { star } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
 
   
 let kayıt = new disbut.MessageMenuOption()
 .setLabel("kayıt Komutları")
 .setDescription("kayıt Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("kayıt")

 let genel = new disbut.MessageMenuOption()
 .setLabel("Genel Komutları")
 .setDescription("Genel Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("genel")

 let üstYetkili = new disbut.MessageMenuOption()
 .setLabel("üstYetkili Komutları")
 .setDescription("üstYetkili Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("üstYetkili")

 let kurucu = new disbut.MessageMenuOption()
 .setLabel("Kurucu Komutları")
 .setDescription("Kurucu Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("kurucu")

 let moderasyon = new disbut.MessageMenuOption()
 .setLabel("Moderasyon Komutları")
 .setDescription("Moderasyon Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("moderasyon")

 let stat = new disbut.MessageMenuOption()
 .setLabel("Stat Komutları")
 .setDescription("Stat Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("stat")

 let yetkili = new disbut.MessageMenuOption()
 .setLabel("Yetkili Komutları")
 .setDescription("Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("yetkili")

 let kısayollar = new disbut.MessageMenu();
 kısayollar.setID("kısayollar");
 kısayollar.setPlaceholder(`Komutlar hakkında yardım almak için tıkla!`)
 kısayollar.addOptions(kayıt,genel,üstYetkili,kurucu,moderasyon,stat,yetkili);

  
 message.channel.send(`${star} \`${message.guild.name}\`, bot komutlarını incelemek için aşağıdaki menüyü kullan!`, kısayollar);

    },
  };

    client.on("clickMenu", async (menu) => {

      if (menu.values[0] === "kayıt") {
       await menu.reply.think(true);
       await menu.reply.edit(`
Kayıt Sistemi
\`\`\`
- .taglı-alım [aç/kapat]
- .kadın (kadın [user] İsim Yaş)
- .erkek (erkek [user] İsim Yaş)
- .bağlantı-kes ([user])
- .isim (isim [user] [name | age])
- .isimler (isimler [user])
- .top-teyit (top-teyit)
- .unregister (unregister [user])
\`\`\`
`)
        };

        if (menu.values[0] === "genel") {
          await menu.reply.think(true);
          await menu.reply.edit(`
Kullanıcı Sistem
\`\`\`
- .afk (afk [sebep])
- .avatar (avatar [UserID/@User])
- .booster (boost [nick])
- .profil (profil / [@üye])
- .tag (tag)
- .yardım (yardım)
- .çek (çek [@üye])
- .git (git [@üye])
- .market (coinmarket) 
\`\`\`
   `)
           };

           if (menu.values[0] === "üstYetkili") {
            await menu.reply.think(true);
            await menu.reply.edit(`
Üst/Orta Yetkili Sistemi
\`\`\`
- .cezapuan (cezapuan [user])
- .rollog (rollog [user])
- .banliste (banlist)
- .rolbilgi (@role)
- .yavasmod (yavasmod []kanal chat)

\`\`\`
     `)
             };
  
             if (menu.values[0] === "kurucu") {
              await menu.reply.think(true);
              await menu.reply.edit(`
Kurucu Sistem
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
- .rolsüz (rolsüz)
- .sıfırla (sıfırla [user])
- .rol (r [al/ver] [user] [@role])
- .coin [ekle/sil/gönder] [kullanıcı] [sayı]
\`\`\`
       `)
               };

               if (menu.values[0] === "moderasyon") {
                await menu.reply.think(true);
                await menu.reply.edit(`
Ceza Sistemi
  \`\`\`

  - .banliste (.banliste [top])
  - .cezapuan (.cezapuan [user])
  - .cezasorgu (.cezasorgu [user])
  - .uyarı (.uyarı [user] [sebep]])

  - .ban (.ban [user] [sebep])
  - .reklam (.reklam [user])
  - .jail (.jail [user] [sebep])
  - .tempjail (.jail [süre] [user] [sebep])
  - .vmute (.vmute [süre] [user] [sebep])
  - .mute (.mute [süre] [user] [sebep])

  - .unban (.unban [user])
  - .unreklam (.unreklam [user])
  - .unjail (.unjail [user])
  - .unmute (.unmute [user])
  - .unvmute (.unvmute [user])



  \`\`\`
         `)
                 };

                 if (menu.values[0] === "stat") {
                  await menu.reply.think(true);
                  await menu.reply.edit(`
Stat sistem
\`\`\`
- .stat (stat [user])
- .top (top)
- .nerede (sesbilgi)
- .topcoin (topcoin)
- .invite (stat [user])
- .topdavet (topdavet)
\`\`\`
           `)
                   };

                   if (menu.values[0] === "yetkili") {
                    await menu.reply.think(true);
                    await menu.reply.edit(`
Yetkili Sistem
\`\`\`
- .ystat (yetkim [user])
- .kes (kes [user])
- .say (say)
- .snipe (snipe)
- .sesli (sesli)
- .sicil (sicil [user])
- .yetkili (yetkili [user])
- .taglı (taglı [user])
- .seslisay (sesli)
- .sil (sil [miktar])
- .görev (görev [user])
\`\`\`
             `)
                     };

    });
      