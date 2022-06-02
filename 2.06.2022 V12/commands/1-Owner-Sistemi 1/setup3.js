const Discord = require("discord.js");
const { MessageEmbed, Message } = require('discord.js')
const config =require('../../models/sunucuayar')
const settings = require('../../configs/settings.json')

const { max } = require("moment");
module.exports = {
    conf: {
      aliases: ["kur2", "setup2"],
      name: "kur2",
    },
    
    run: async (client, message, args, embed, prefix) => {

        if(!settings.owners.includes(message.author.id)) return
        let choose = args[0]

        if(choose === "yardım") {
            message.channel.send(new Discord.MessageEmbed()

.addField(`
\`\`\`KATAGORİ SETTINGS\`\`\``, `
.kur publicParents #PUBLİC
.kur privateParents #PRİV
.kur aloneParents #ALONE
.kur funParents #YÖNETİM
.kur registerParents #KAYIT
`)
.addField(`
\`\`\`KANALLAR SETTINGS\`\`\``, `
.kur chatChannel #chatChannel
.kur kurallar #kurallar
`)
.addField(`
\`\`\`CEZA LOG SETTINGS\`\`\``, `
.kur cezapuanlog #cezapuanlog
.kur transportlog #transportlog
.kur jailLogChannel #jailLogChannel
.kur banLogChannel #banLogChannel
.kur warnLogChannel #warnLogChannel
.kur reklamLogChannel #reklamLogChannel
.kur cmuteLogChannel #cmuteLogChannel
.kur vmuteLogChannel #vmuteLogChannel
`)
.addField(`
\`\`\`REGİSTER SETTINGS\`\`\``, `
.kur invLogChannel #invLogChannel
.kur teyitKanali #teyitKanali
`)
.addField(`
\`\`\`LOG SETTINGS\`\`\``, `
.kur ekipLogChannel #ekipLogChannel
.kur yetkiLog #yetkiLog
.kur marketLog #marketLog
`)
.addField(`
\`\`\`TOPLANTI SETTINGS\`\`\``, `
.kur toplantiSesChannel #toplantiSesChannel
.kur mazaretliLogChannel #mazaretliLogChannel
`)
.setColor('RANDOM')
.setThumbnail(message.guild.iconURL({dynamic: true})))
}

        if(!choose) {
            let ayar = await config.findOne({guildID: message.guild.id})
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Ayarlar`, message.author.avatarURL({dynamic: true}))

.addField(`
\`\`\`KATAGORİ SETTINGS\`\`\``, `

**publicParents :** (${ayar.publicParents.length ? `<#${ayar.publicParents}>` : "\`YOK\`"})
**privateParents:** (${ayar.privateParents.length ? `<#${ayar.privateParents}>` : "\`YOK\`"})
**aloneParents:** (${ayar.aloneParents.length ? `<#${ayar.aloneParents}>` : "\`YOK\`"})
**funParents:** (${ayar.funParents.length ? `<#${ayar.funParents}>` : "\`YOK\`"})
**registerParents:** (${ayar.registerParents.length ? `<#${ayar.registerParents}>` : "\`YOK\`"})
`)

.addField(`
\`\`\`KANALLAR SETTINGS\`\`\``, `
**chatChannel:** (${ayar.chatChannel.length ? `<#${ayar.chatChannel}>` : "\`YOK\`"})
**kurallar:** (${ayar.kurallar.length ? `<#${ayar.kurallar}>` : "\`YOK\`"})
`)

.addField(`
\`\`\`SİSTEM LOG SETTINGS\`\`\``, `
**cezapuanlog:** (${ayar.cezapuanlog.length ? `<#${ayar.cezapuanlog}>` : "\`YOK\`"})
**transportlog:** (${ayar.transportlog.length ? `<#${ayar.transportlog}>` : "\`YOK\`"})
**jailLogChannel:** (${ayar.jailLogChannel.length ? `<#${ayar.jailLogChannel}>` : "\`YOK\`"})
**banLogChannel:** (${ayar.banLogChannel.length ? `<#${ayar.banLogChannel}>` : "\`YOK\`"})
**warnLogChannel:** (${ayar.warnLogChannel.length ? `<#${ayar.warnLogChannel}>` : "\`YOK\`"})
**reklamLogChannel:** (${ayar.reklamLogChannel.length ? `<#${ayar.reklamLogChannel}>` : "\`YOK\`"})
**cmuteLogChannel:** (${ayar.cmuteLogChannel.length ? `<#${ayar.cmuteLogChannel}>` : "\`YOK\`"})
**vmuteLogChannel:** (${ayar.vmuteLogChannel.length ? `<#${ayar.vmuteLogChannel}>` : "\`YOK\`"})

`)

.addField(`
\`\`\`REGİSTER LOG SETTINGS\`\`\``, `
**teyitKanali:** (${ayar.teyitKanali.length ? `<#${ayar.teyitKanali}>` : "\`YOK\`"})
**invLogChannel:** (${ayar.invLogChannel.length ? `<#${ayar.invLogChannel}>` : "\`YOK\`"})

`)

.addField(`
\`\`\`LOG KANALLAR SETTINGS\`\`\``, `
**ekipLogChannel:** (${ayar.ekipLogChannel.length ? `<#${ayar.ekipLogChannel}>` : "\`YOK\`"})
**yetkiLog:** (${ayar.yetkiLog.length ? `<#${ayar.yetkiLog}>` : "\`YOK\`"})
**marketLog:** (${ayar.marketLog.length ? `<#${ayar.marketLog}>` : "\`YOK\`"})
`)

.addField(`
\`\`\`LOG KANALLAR SETTINGS\`\`\``, `
**toplantiSesChannel:** (${ayar.toplantiSesChannel.length ? `<#${ayar.toplantiSesChannel}>` : "\`YOK\`"})
**mazaretliLogChannel:** (${ayar.mazaretliLogChannel.length ? `<#${ayar.mazaretliLogChannel}>` : "\`YOK\`"})
`)
           .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL({dynamic: true})))
        }

        let pusha = await config.findOne({guildID: settings.guildID})


        if(["publicParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`SunucuPublicParent belirtmelisin`, message.author, message.channel))
            pusha.publicParents  = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu PublicParent başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["privateParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu privateParents belirtmelisin`, message.author, message.channel))
            pusha.privateParents = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu privateParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["aloneParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu aloneParents belirtmelisin`, message.author, message.channel))
            pusha.aloneParents = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu aloneParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["funParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu funParents belirtmelisin`, message.author, message.channel))
            pusha.funParents = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu funParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["registerParents",].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu registerParents belirtmelisin`, message.author, message.channel))
            pusha.registerParents = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu registerParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["chatChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatChannel belirtmelisin`, message.author, message.channel))
            pusha.chatChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["kurallar"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kurallar belirtmelisin`, message.author, message.channel))
            pusha.kurallar = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kurallar başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["cezapuanlog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cezapuanlog belirtmelisin`, message.author, message.channel))
            pusha.cezapuanlog = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cezapuanlog başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["transportlog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu transportlog belirtmelisin`, message.author, message.channel))
            pusha.transportlog = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu transportlog başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["jailLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailLogChannel belirtmelisin`, message.author, message.channel))
            pusha.jailLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["banLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banLogChannel belirtmelisin`, message.author, message.channel))
            pusha.banLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["warnLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnLogChannel belirtmelisin`, message.author, message.channel))
            pusha.warnLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["reklamLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamLogChannel belirtmelisin`, message.author, message.channel))
            pusha.reklamLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["cmuteLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteLogChannel belirtmelisin`, message.author, message.channel))
            pusha.cmuteLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["vmuteLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteLogChannel belirtmelisin`, message.author, message.channel))
            pusha.vmuteLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["invLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu invLogChannel belirtmelisin`, message.author, message.channel))
            pusha.invLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu invLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["teyitKanali"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu teyitKanali belirtmelisin`, message.author, message.channel))
            pusha.teyitKanali = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu teyitKanali başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["ekipLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekipLogChannel belirtmelisin`, message.author, message.channel))
            pusha.ekipLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekipLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["yetkiLog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yetkiLog belirtmelisin`, message.author, message.channel))
            pusha.yetkiLog = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yetkiLog başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };


        if(["marketLog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu marketLog belirtmelisin`, message.author, message.channel))
            pusha.marketLog = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu marketLog başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };


        if(["toplantiSesChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu toplantiSesChannel belirtmelisin`, message.author, message.channel))
            pusha.toplantiSesChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu toplantiSesChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["mazaretliLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliLogChannel belirtmelisin`, message.author, message.channel))
            pusha.mazaretliLogChannel = log.id, await pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };





      
    }
}

