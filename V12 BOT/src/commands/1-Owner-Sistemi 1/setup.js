const serverSettings = require('../../models/sunucuayar')
const settings = require('../../configs/settings.json')

const { green, red } = require("../../configs/emojis.json")
const { MessageButton, MessageActionRow } = require('discord-buttons')
const { MessageEmbed, Message } = require('discord.js')
module.exports = {
  conf: {
    aliases: ["kurulum"],
    name: "kurulum",
  },

  run: async (client, message, args, embed, prefix) => {

    let Roles = await serverSettings.findOne({
      guildID: settings.guildID
  });

    var setup1 = new MessageButton()
    .setID("setup1")
    .setLabel('Rol K. 1')
    .setStyle('3')
    
    var setup2 = new MessageButton()
    .setID("setup2")
    .setLabel('Cezalı Rol K.')
    .setStyle('3')

    var setup3 = new MessageButton()
    .setID("setup3")
    .setLabel('Rol K. 2')
    .setStyle('3')

    var setup4 = new MessageButton()
    .setID("setup4")
    .setLabel('Tag K.')
    .setStyle('3')

    var setup5 = new MessageButton()
    .setID("setup5")
    .setLabel('Ceza K.')
    .setStyle('3')

    var setup6 = new MessageButton()
    .setID("setup6")
    .setLabel('Kanal K. 1')
    .setStyle('1')
    
    var setup7 = new MessageButton()
    .setID("setup7")
    .setLabel('Kanal K. 2')
    .setStyle('1')

    var setup8 = new MessageButton()
    .setID("setup8")
    .setLabel('Kanal K. 3')
    .setStyle('1')

    var setup9 = new MessageButton()
    .setID("setup9")
    .setLabel('Kanal K. 4')
    .setStyle('1')

    var setup10 = new MessageButton()
    .setID("setup10")
    .setLabel('Kanal K. 5')
    .setStyle('1')

    const row1 = new MessageActionRow()
    .addComponent(setup1)
    .addComponent(setup3)
    .addComponent(setup2)
    .addComponent(setup4)
    .addComponent(setup5)

    const row2 = new MessageActionRow()
    .addComponent(setup6)
    .addComponent(setup7)
    .addComponent(setup8)
    .addComponent(setup9)
    .addComponent(setup10)


    let pushamsg = new MessageEmbed()
    .setDescription('Mehraba Sunucu Owner Setup Sisteminin Nasıl Yapildigini Merak Edıyorsan Asağdaki Buttonlara Tıklayarak Göre Bilirsiniz')
    .setFooter('60 saniye içinde bu butonlar iptal edilecektir.')
    .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
    .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
    .setColor('RANDOM')

///"style":1 mavi
///"style":2 gri
///"style":3 yesil
///"style":4 kırmızı


    let msg = await message.channel.send({ components: [row1, row2], embed: pushamsg})
    
    var filter = (button) => button.clicker.user.id === message.author.id;
 
    let collector = await msg.createButtonCollector(filter, { time: 60000 })

    collector.on("collect", async (button) => {
      if(button.id == 'setup1'){
        await button.reply.defer()
        let setup1msg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kur erkekrol @erkekrol1 @erkekrol2
        \`>\` ${prefix}kur kadınrol @kadınrol1 kadınrol2
        \`>\` ${prefix}kur kayıtsızrol @kayıtsızrol
        \`>\` ${prefix}kur viprol @viprol
        \`>\` ${prefix}kur boosterRolu @boosterRolu

        **DC ROL KUR**
        \`>\` ${prefix}kur dcyöneticirol @dcyöneticirol 
        \`>\` ${prefix}kur dcoyuncurol @dcoyuncurol 

        **VK ROL KUR**
        \`>\` ${prefix}kur vkyöneticirol @vkyöneticirol 
        \`>\` ${prefix}kur vkdoktorrol @vkdoktorrol 
        \`>\` ${prefix}kur vkölürol @vkölürol 
        \`>\` ${prefix}kur vkoyuncu @vkoyuncu 

        **STREAMER ROL KUR**
        \`>\` ${prefix}kur steamerrol @steamerrol
        
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')
        msg.edit({
          components: row1,
          embed: setup1msg
        })
      }
      if(button.id == 'setup2'){
        await button.reply.defer()
        let setup2msg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kur dccezalırol @dccezalırol
        \`>\` ${prefix}kur vkcezalırol @vkcezalırol
        \`>\` ${prefix}kur steamercezalırol @steamercezalırol
        \`>\` ${prefix}kur jailrol @jailrol
        \`>\` ${prefix}kur reklamrol @reklamrol
        \`>\` ${prefix}kur yasaklıtagrol @yasaklıtagrol
        \`>\` ${prefix}kur süphelihesaprol @süphelihesaprol
        \`>\` ${prefix}kur sesmuterol @sesmuterol
        \`>\` ${prefix}kur chatmuterol @chatmuterol

        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          embed: setup2msg,
          components: [row1]
        })
      }
      if(button.id == 'setup3'){
        await button.reply.defer()
        let setup3msg = new MessageEmbed()
        .setDescription(`
       **RENK ROL KURULUM**
        \`>\` ${prefix}kur turuncurol @turuncu
        \`>\` ${prefix}kur yesilrol @yesil
        \`>\` ${prefix}kur mavirol @mavi
        \`>\` ${prefix}kur pemberol @pembe
        \`>\` ${prefix}kur kırmızırol @kırmızı

        **AY ROL KURULUM**
        \`>\` ${prefix}kur 12aylıküyerol @12aylıküye
        \`>\` ${prefix}kur 9aylıküyerol @9aylıküye
        \`>\` ${prefix}kur 6aylıküyerol @6aylıküye
        \`>\` ${prefix}kur 3aylıküyerol @3aylıküye 
        \`>\` ${prefix}kur 1aylıküyerol @1aylıküye
       
        **OYUN ROL KURULUM**
        \`>\` ${prefix}kur gta5rol @gta5
        \`>\` ${prefix}kur cs:gorol @cs:go
        \`>\` ${prefix}kur forniterol @fornite
        \`>\` ${prefix}kur valorantrol @valorant
        \`>\` ${prefix}kur minecraftrol @minecraft
        \`>\` ${prefix}kur amongusrol @amongus
        \`>\` ${prefix}kur leagueoflegendsrol @league of legends
        \`>\` ${prefix}kur pubgmobilrol @pubg mobil

        **BURC ROL KURULUM**
        \`>\` ${prefix}kur yengeçrol @yengeç
        \`>\` ${prefix}kur aslanrol @aslan
        \`>\` ${prefix}kur akreprol @akrep
        \`>\` ${prefix}kur oğlakrol @oğlak
        \`>\` ${prefix}kur balıkrol @balık
        \`>\` ${prefix}kur başakrol @başak
        \`>\` ${prefix}kur kovarol @kova
        \`>\` ${prefix}kur terazirol @terazi
        \`>\` ${prefix}kur yayrol @yay
        \`>\` ${prefix}kur koçrol @koç
        \`>\` ${prefix}kur ikizlerrol @ikizler
        \`>\` ${prefix}kur boğarol @boğa

        **SEVGİLİ ROL KURULUM**
        \`>\` ${prefix}kur sevgilimvarrol @sevgilimvar
        \`>\` ${prefix}kur sevgilimyokrol @sevgilimyok
        \`>\` ${prefix}kur lgbtrol @lgbt
        \`>\` ${prefix}kur ıwantloverrol @ı want lover
        \`>\` ${prefix}kur ıdonotneedanyonerol @ı do not need anyone
       
       **SUNUCU İCİ ETKİNLİK ROL KURULUM**
        \`>\` ${prefix}kur çekiliskatılımcısırol @çekiliskatılımcısı
        \`>\` ${prefix}kur etkinlikkatılımcısırol @etkinlikkatılımcısı
        \`>\` ${prefix}kur filmkatılımcısırol @filmkatılımcısı`)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')
        msg.edit({
          embed: setup3msg,
          components: [row1]
        })

      }
      if(button.id == 'setup4'){
        await button.reply.defer()
        let setup4msg = new MessageEmbed()
        .setDescription(`
        **SUNUCU TAG KURULUM**
        \`>\` ${prefix}kur ekiprol @ekiprol
        \`>\` ${prefix}kur isimtag sembol
        \`>\` ${prefix}kur etikettag #etikettag
        \`>\` ${prefix}kur tag1 tag alınca basına gelecek tag sembol
        \`>\` ${prefix}kur tag2 tag salınca basına gelecek tag sembol

        **RANK ROL KURULUM**
        \`>\` ${prefix}kur yetki1 @yetki1
        \`>\` ${prefix}kur yetki2 @yetki2
        \`>\` ${prefix}kur yetki3 @yetki3
        \`>\` ${prefix}kur yetki4 @yetki4
        \`>\` ${prefix}kur yetki5 @yetki5
        \`>\` ${prefix}kur yetki6 @yetki6
        \`>\` ${prefix}kur yetki7 @yetki7
        \`>\` ${prefix}kur yetki8 @yetki8
        \`>\` ${prefix}kur yetki9 @yetki9
        \`>\` ${prefix}kur yetki10 @yetki10
        \`>\` ${prefix}kur yetki11 @yetki11
        \`>\` ${prefix}kur yetki12 @yetki12
        \`>\` ${prefix}kur yetki13 @yetki13
        \`>\` ${prefix}kur yetki14 @yetki14
        \`>\` ${prefix}kur yetki15 @yetki15
        \`>\` ${prefix}kur yetki16 @yetki16

        **YETKİ HAMMER ROL KURULUM**

        \`>\` ${prefix}kur warnhammer @warnhammer
        \`>\` ${prefix}kur viphammer @viphammer
        \`>\` ${prefix}kur banhammer @banhammer
        \`>\` ${prefix}kur jailhammer @jailhammer
        \`>\` ${prefix}kur vmutehammer @vmutehammer
        \`>\` ${prefix}kur cmutehammer @cmutehammer
        \`>\` ${prefix}kur registerhammer @registerhammer
       
        \`>\` ${prefix}kur staffRoles @staffRoles
        **TOPLANTI ROL KURULUM**
        \`>\` ${prefix}kur Katıldı @Katıldı
        \`>\` ${prefix}kur Mazeretli  @Mazeretli 
        \`>\` ${prefix}kur Katılmadı  @Katılmadı 

        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row1],
          embed: setup4msg
        })
      }
     
      if(button.id == 'setup5'){
        await button.reply.defer()
        let setup5msg = new MessageEmbed()
        .setDescription(`

        **LEADERBOARDS ROL KURULUM**
        \`>\` ${prefix}kur VoiceEmerl @VoiceEmerl
        \`>\` ${prefix}kur VoiceDiamond @VoiceDiamond 
        \`>\` ${prefix}kur VoiceGold  @VoiceGold 
        \`>\` ${prefix}kur VoiceSilver @VoiceSilver
        \`>\` ${prefix}kur VoiceBronze  @VoiceBronze 
     
        \`>\` ${prefix}kur ChatEmerl @ChatEmerl
        \`>\` ${prefix}kur ChatDiamond @ChatDiamond 
        \`>\` ${prefix}kur ChatGold  @ChatGold 
        \`>\` ${prefix}kur ChatSilver @ChatSilver
        \`>\` ${prefix}kur ChatBronze  @ChatBronze  
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row1],
          embed:setup5msg
        })
      }


      if(button.id == 'setup6'){
        await button.reply.defer()
        let setup6msg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kur ChatMsgList #ChatMsgList
        \`>\` ${prefix}kur VoiceMsgList #VoiceMsgList 
        \`>\` ${prefix}kur ChatLeaderBoard  #ChatLeaderBoard 
        \`>\` ${prefix}kur VoiceLeaderBoard #VoiceLeaderBoard
        \`>\` ${prefix}kur Prizelog #Prizelog
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row2],
          embed:setup6msg
        })
      }

      if(button.id == 'setup7'){
        await button.reply.defer()
        let setup7msg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kur rankLog #rankLog
        \`>\` ${prefix}kur kurallar #kurallar
        \`>\` ${prefix}kur yetkiLog #yetkiLog
        \`>\` ${prefix}kur komutLog #komutLog
        \`>\` ${prefix}kur marketLog #marketLog
        \`>\` ${prefix}kur cezapuanlog #cezapuanlog
        \`>\` ${prefix}kur chatChannel #chatChannel
        \`>\` ${prefix}kur teyitKanali #teyitKanali
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row2],
          embed:setup7msg
        })
      }


      if(button.id == 'setup8'){
        await button.reply.defer()
        let setup8msg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kur transportlog #transportlog
        \`>\` ${prefix}kur rollogchannel #rollogchannel
        \`>\` ${prefix}kur invLogChannel #invLogChannel
        \`>\` ${prefix}kur banLogChannel #banLogChannel
        \`>\` ${prefix}kur jailLogChannel #jailLogChannel
        \`>\` ${prefix}kur warnLogChannel #warnLogChannel
        \`>\` ${prefix}kur ekipLogChannel #ekipLogChannel
        \`>\` ${prefix}kur reklamLogChannel #reklamLogChannel
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row2],
          embed:setup8msg
        })
      }

      if(button.id == 'setup9'){
        await button.reply.defer()
        let setup9msg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kur cmuteLogChannel #cmuteLogChannel
        \`>\` ${prefix}kur vmuteLogChannel #vmuteLogChannel
        \`>\` ${prefix}kur voiceLogChannel #voiceLogChannel
        \`>\` ${prefix}kur messageLogChannel #messageLogChannel
        \`>\` ${prefix}kur toplantiSesChannel #toplantiSesChannel
        \`>\` ${prefix}kur mazaretliLogChannel #mazaretliLogChannel
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row2],
          embed:setup9msg
        })
      }

      if(button.id == 'setup10'){
        await button.reply.defer()
        let setup10msg = new MessageEmbed()
        .setDescription(`
        \`>\` ${prefix}kur publicParents #publicParents
        \`>\` ${prefix}kur privateParents #privateParents
        \`>\` ${prefix}kur aloneParents #aloneParents
        \`>\` ${prefix}kur funParents #funParents
        \`>\` ${prefix}kur registerParents #registerParents
        \`>\` ${prefix}kur solvingParents #solvingParents
        `)
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true}))
        .setThumbnail(message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('RANDOM')

        msg.edit({
          components: [row2],
          embed:setup10msg
        })
      }





    })
}}