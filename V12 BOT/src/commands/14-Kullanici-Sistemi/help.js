const serverSettings =require('../../models/sunucuayar')
const { green, red } = require("../../configs/emojis.json")
const { MessageButton, MessageActionRow } = require('discord-buttons')
const { MessageEmbed, Message } = require('discord.js')
module.exports = {
  conf: {
    aliases: ["help", "y", "help","yardım"],
    name: "yardım",
  },

  run: async (client, message, args, embed, prefix) => {

    if (!message.guild) return;
    let Roles = await serverSettings.findOne({
      guildID: message.guild.id
  });
  


    var member = new MessageButton()
    .setID("member")
    .setLabel('Üye K.')
    .setStyle('3')
    
    var yetkili = new MessageButton()
    .setID("yetkili")
    .setLabel('Yetkili K.')
    .setStyle('1')

    var üstyetkili = new MessageButton()
    .setID("üstyetkili")
    .setLabel('ÜstYetkili K.')
    .setStyle('1')

    var owner = new MessageButton()
    .setID("owner")
    .setLabel('Owner K.')
    .setStyle('4')

    var ceza = new MessageButton()
    .setID("ceza")
    .setLabel('Ceza K.')
    .setStyle('1')


    const row1 = new MessageActionRow()
    .addComponent(member)
    .addComponent(yetkili)
    .addComponent(üstyetkili)
    .addComponent(ceza)
    .addComponent(owner)

    

    let ravimsg = new MessageEmbed()
    .setDescription('Merhabalar görünüşe göre yardıma ihtiyacın var. Altta ki butonları kullanarak yardım alabilirsin. Unutma belirli rollerin yoksa bakamayabilirsin.')
    .setFooter('30 saniye içinde bu butonlar iptal edilecektir.')
    .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
    .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
    .setColor('RANDOM')

///"style":1 mavi
///"style":2 gri
///"style":3 yesil
///"style":4 kırmızı


    let msg = await message.channel.send({ components: [row1], embed: ravimsg})
    
    var filter = (button) => button.clicker.user.id === message.author.id;
 
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

    collector.on("collect", async (button) => {
      if(button.id == 'member'){
        await button.reply.defer()
        let membermsg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}git @etiket | Etiketlediğiniz kişi onaylarsa otomatik yanına gidersiniz.
        \`>\` ${prefix}çek @etiket | Etiketlediğiniz kişi onaylarsa otomatik yanınıza çekersiniz.
        \`>\` ${prefix}link | Sunucumuzun linkini paylaşır.
        \`>\` ${prefix}stat | Sunucu istatiklerinizi gösteririr.
        \`>\` ${prefix}topstat | Sunucumuzun istatiklerini dereceli şekilde sıralar.
        \`>\` ${prefix}avatar | etiketlediğiniz veya sizin avatarınızı paylaşır.
        \`>\` ${prefix}zengin <İsim> | Eğer sunucumuza boost başmışsanız istediğiniz ismi koyabilirsiniz.
        \`>\` ${prefix}invites | invite bilgilerini gösterir.
        \`>\` ${prefix}invitetop | invite listesini sıralar.`)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')
        msg.edit({
          components: row1,
          embed: membermsg
        })
      }
      if(button.id == 'yetkili'){
        await button.reply.defer()
        if(!message.member.roles.cache.has(Roles.staffs)) return msg.edit({embed: embed.setDescription("Gerekli yetkiye sahip değilsin."),components: [row1]})
        let yetkilimsg = new MessageEmbed()
        .setDescription(`
        **Register Komutları**
        \`>\` ${prefix}kadın <@Etiket/ID> İsim Yaş | Çıkan butonlarla üyeleri kayıt edersiniz.
        \`>\` ${prefix}erkek <@Etiket/ID> İsim Yaş | Çıkan butonlarla üyeleri kayıt edersiniz.
        \`>\` ${prefix}isim <@Etiket/ID> İsim Yaş  | kişinin ismini değiştirir.
        \`>\` ${prefix}kayıtsız <@Etiket/ID> | kişiyi kayıtsıza atar.
        \`>\` ${prefix}isimler <@Etiket/ID> | kişinin eski isimlerini gösterir.
        \`>\` ${prefix}kayıtstat kayıt listesini gösterir.
        **Yetkili Komutları**
        \`>\` ${prefix}sesli | Sesli kanallarda ki istatikleri gösterir.
        \`>\` ${prefix}yetkim | Puan durumunuzu gösterir
        \`>\` ${prefix}seskontrol <Üye/KanalID> | belirttiğiniz ID'deki kanal veya üyenin bilgilerini gösterir.
        \`>\` ${prefix}vip <@Etiket/ID> |etiketlediğiniz üyeye vip rolünü verir.
        \`>\` ${prefix}snipe | kullandıgınız kanalda ki en son silinen mesajı gösterir.`)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          embed: yetkilimsg,
          components: [row1]
        })
      }
      if(button.id == 'üstyetkili'){
        await button.reply.defer()
        if(!message.member.roles.cache.has(Roles.staffs)) return msg.edit({embed: embed.setDescription("Gerekli yetkiye sahip değilsin."),components: [row1]})
        let üstyetkilimsg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kilit | Belirttiğiniz kanalı kilitler.
        \`>\` ${prefix}sil Miktar | Belirttiğiniz miktarda mesaj siler.
        \`>\` ${prefix}tagsay <Tag> | Belirttiğiniz tagın sunucu içerisinde ki bilgileri atar.
        \`>\` ${prefix}yetkilises | Seste olmayan yetkililere etiket atar.
        \`>\` ${prefix}toplantı başlat | Komutunu kullanırsanız toplantıyı başlatırsınız.`)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')
        msg.edit({
          embed: üstyetkilimsg,
          components: [row1]
        })

      }
      if(button.id == 'owner'){
        await button.reply.defer()
        if(!Roles.sahipRolu.some(x => message.member.roles.cache.has(x))) return msg.edit({embed: embed.setDescription('owner değilsin knk.'),components: [row1]})
        let ownermsg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}toplutaşı KanalID | Bulundugunuz seste ki bütün üyeleri belirttiğiniz kanala taşır.
        \`>\` ${prefix}sıfırla <@Etiket/ID> | Etiketlediğiniz üyenin statlarını sıfırlayabilirsiniz.
        \`>\` ${prefix}rollog <@Etiket/ID> | Etiketlediğiniz üyenin geçmiş rollerini görüntülersiniz.
        \`>\` ${prefix}control | Rolü olmayan üyeler - Tagı olup tag rolü olmayan üyelere rollerini dağıtırsınız.
        \`>\` ${prefix}taglıalım aç/kapat | Açtığınız takdirde üyelerimiz tagsız kayıt olamayacaklardır. Kapatrısanız tagsız kayıt olabilirler.

        \`>\` ${prefix}çekiliş [süre] [kazanansayısı] [ödül] = "Çekiliş Yaparsınız"
        \`>\` ${prefix}çekilişdurdur = "Çekilişi Durdurursunuz."
        \`>\` ${prefix}çekilişibitir= "Çekilişi Bitirirsiniz."
        \`>\` ${prefix}yenikişiseç = "Çekilişde Yeni Kişi Seçersiniz."
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row1],
          embed: ownermsg
        })
      }
     
      if(button.id == 'ceza'){
        await button.reply.defer()
        if(!message.member.roles.cache.has(Roles.staffs)) return msg.edit({embed: embed.setDescription("Gerekli yetkiye sahip değilsin."),components: [row1]})

        let cezamsg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}reklam <@Etiket/ID> Sebep | Etiketlediğiniz kişiyi reklam atar.
        \`>\` ${prefix}unreklam <@Etiket/ID> Sebep | Etiketlediğiniz kişiyi reklam çıkarır.
        \`>\` ${prefix}jail <@Etiket/ID> Sebep | Etiketlediğiniz kişiyi jaile atar.
        \`>\` ${prefix}unjail <@Etiket/ID> Sebep | Etiketlediğiniz kişiyi jailden çıkarır.
        \`>\` ${prefix}mute <@Etiket/ID> süre sebep | Etiketlediğiniz kişiyi s = saniye > m = dakika > h = saat şekline süre belirtin. örnek 10s
        \`>\` ${prefix}unmute <@Etiket/ID> Sebep | Etiketlediğiniz kişiyi mutesini kaldırır.
        \`>\` ${prefix}vmute <@Etiket/ID> süre sebep | Etiketlediğiniz kişiyi s = saniye > m = dakika > h = saat şekline süre belirtin. örnek 10s
        \`>\` ${prefix}unvmute <@Etiket/ID> Sebep | Etiketlediğiniz kişiyi ses mutesini kaldırır.

        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row1],
          embed: cezamsg
        })
      }
    })
}}