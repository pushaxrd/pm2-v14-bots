const Discord = require("discord.js");
const { MessageEmbed, Message } = require('discord.js')
const config =require('../../models/sunucuayar')
const settings = require('../../configs/settings.json')

const { max } = require("moment");
module.exports = {
    conf: {
      aliases: ["kur", "setup"],
      name: "kur",
    },
    
    run: async (client, message, args, embed, prefix) => {

        if(!settings.owners.includes(message.author.id)) return
        let choose = args[0]

        if(choose === "yardım") {
            message.channel.send(new Discord.MessageEmbed()
  .addField(`
\`\`\`GUILD SETTINGS\`\`\``,`
.kur guildowners @SunucuKurucuları
.kur rolverici @rolverici
.Kur sahipRolu @sahipRolu


`)
.addField(`
\`\`\`GUILD SETTINGS\`\`\``,`
.kur tag (Tag)
.Kur ikinciTag (İkinciTag)
.kur ekipRolu @familyrol
`)

.addField(`
\`\`\`YETKİLİ ROLE SETTINGS\`\`\``,`
.kur staffs @staffs 
.kur teyitciRolleri @Registerperm
.kur warnHammer @warnHammer
.kur banHammer @banHammer
.kur jailHammer @jailHammer
.kur VipHammer @VipHammer
.kur cmuteHammer @cmuteHammer
.kur vmuteHammer @vmuteHammer

`)
.addField(`
\`\`\`ROLE SETTINGS\`\`\``,`
.kur erkekRolleri @erkekRolleri
.kur kizRolleri @kizRolleri
.kur vipRole @vipRole
.kur boosterRolu @boosterRolu
.kur unregRoles @unregRoles
.kur çekilis @çekilis
.kur etkinlik @etkinlik
.kur film @film
`)
.addField(`
\`\`\`CEZA SETTINGS\`\`\``, `
.kur jailRole @jailRole
.kur VkCezalı @VkCezalı
.kur DcCezalı @DcCezalı
.kur chatMute @chatMute
.kur voiceMute @voiceMute
.kur fakeAccRole @fakeAccRole
.kur reklamRole @reklamRole
.kur yasaklıtagRole @yasaklıtagRole
`)
.addField(`
\`\`\`TOPLANTİ SETTINGS\`\`\``, `
.kur uyariRole @uyariRole
.kur katildiRole @katildiRole
.kur mazaretliRole @mazaretliRole
.kur enAltYetkiliRole @enAltYetkiliRole
`)

.setColor('RANDOM')
.setThumbnail(message.guild.iconURL({dynamic: true})))
}

        if(!choose) {
            let ayar = await config.findOne({guildID: message.guild.id})
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Ayarlar`, message.author.avatarURL({dynamic: true}))
            .addField(`
\`\`\`OWNER SETTINGS\`\`\``, `

**guildowner:** (${ayar.guildowner.length > 0 ? `${ayar.guildowner.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
**rolverici:** (${ayar.rolverici.length > 0 ? `${ayar.rolverici.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**sahipRolu:** (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

.addField(`
\`\`\`KORUMA SETTINGS\`\`\``, `

**ceo:** (${ayar.ceo.length > 0 ? `${ayar.ceo.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**owner:** (${ayar.owner.length > 0 ? `${ayar.owner.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**yıldız** (${ayar.yıldız.length > 0 ? `${ayar.yıldız.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

           .addField(`
\`\`\`FAMİLY SETTINGS\`\`\``, `

**tag:** (${ayar.tag ? ayar.tag : "\`YOK\`"}) 
**ikinciTag:** (${ayar.ikinciTag ? ayar.ikinciTag : "\`YOK\`"})
**ekipRolu:** (${ayar.ekipRolu.length > 0 ? `${ayar.ekipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.addField(`
\`\`\`YETKİLİ SETTINGS\`\`\``, `

**staffs:** (${ayar.staffs.length > 0 ? `${ayar.staffs.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**teyitciRolleri:** (${ayar.teyitciRolleri.length > 0 ? `${ayar.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**warnHammer:** (${ayar.warnHammer.length > 0 ? `${ayar.warnHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**banHammer:** (${ayar.banHammer.length > 0 ? `${ayar.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**jailHammer:** (${ayar.jailHammer.length > 0 ? `${ayar.jailHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**VipHammer:** (${ayar.VipHammer.length > 0 ? `${ayar.VipHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**cmuteHammer:** (${ayar.cmuteHammer.length > 0 ? `${ayar.cmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**vmuteHammer:** (${ayar.vmuteHammer.length > 0 ? `${ayar.vmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.addField(`
\`\`\`SUNUCU SETTINGS\`\`\``, `

**erkekRolleri:** (${ayar.erkekRolleri.length > 0 ? `${ayar.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**kizRolleri:** (${ayar.kizRolleri.length > 0 ? `${ayar.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**vipRole:** (${ayar.vipRole.length > 0 ? `${ayar.vipRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**boosterRolu:** (${ayar.boosterRolu.length > 0 ? `${ayar.boosterRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**unregRoles:** (${ayar.unregRoles.length > 0 ? `${ayar.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

**çekilis:** (${ayar.çekilis.length > 0 ? `${ayar.çekilis.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**etkinlik:** (${ayar.etkinlik.length > 0 ? `${ayar.etkinlik.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**film:** (${ayar.film.length > 0 ? `${ayar.film.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

`)

.addField(`
\`\`\`CEZA SETTINGS\`\`\``, `

**jailRole:** (${ayar.jailRole.length > 0 ? `${ayar.jailRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**VkCezalı:** (${ayar.VkCezalı.length > 0 ? `${ayar.VkCezalı.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**DcCezalı:** (${ayar.DcCezalı.length > 0 ? `${ayar.DcCezalı.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**chatMute:** (${ayar.chatMute.length > 0 ? `${ayar.chatMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**voiceMute:** (${ayar.voiceMute.length > 0 ? `${ayar.voiceMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**fakeAccRole:** (${ayar.fakeAccRole.length > 0 ? `${ayar.fakeAccRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**reklamRole:** (${ayar.reklamRole.length > 0 ? `${ayar.reklamRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**yasaklıtagRole:** (${ayar.yasaklıtagRole.length > 0 ? `${ayar.yasaklıtagRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

.addField(`
\`\`\`TOPLANTİ SETTINGS\`\`\``, `

**uyariRole:** (${ayar.uyariRole.length > 0 ? `${ayar.uyariRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**katildiRole:** (${ayar.katildiRole.length > 0 ? `${ayar.katildiRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**mazaretliRole:** (${ayar.mazaretliRole.length > 0 ? `${ayar.mazaretliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**enAltYetkiliRole:** (${ayar.enAltYetkiliRole.length > 0 ? `${ayar.enAltYetkiliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

           .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL({dynamic: true})))
        }

        let pusha = await config.findOne({guildID: message.guild.id})

        if (["guildowner"].some(x => x === choose)) {
            let rol;
            if (message.mentions.users.size >= 1) {
                rol = message.mentions.users.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ownerlarını belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.users.cache.get(id)).filter(r => r != undefined);
            }
            pusha.guildowner = rol, pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ownerları başarıyla ${rol.map(x => `<@${x}>`)} olarak ayarlandı`, message.author, message.channel))
        };

        if(["rolverici"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu rolverici komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.rolverici = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu rolverici komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["sahipRolu"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu SahipRolü rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.sahipRolu = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu SahipRolü rolünü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }


        if (["tag"].some(x => x === choose)) {
            let select = args[1];
            if (!select) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun tagını belirtmelisin`, message.author, message.channel))
            pusha.tag = select, pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu tagı başarıyla ${select} olarak ayarlandı`, message.author, message.channel))
        };

        if (["ikinciTag"].some(x => x === choose)) {
            let select = args[1];
            if (!select) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ikinci tagını belirtmelisin`, message.author, message.channel))
            pusha.ikinciTag = select, pusha.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ikinci tagı başarıyla ${select} olarak ayarlandı`, message.author, message.channel))
        };

        if(["ekipRolu"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekip rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.ekipRolu = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekipRolu başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }
    
        if(["staffs"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu staffs komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.staffs = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu teyitciRolleri komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }
        
        if(["teyitciRolleri"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu staffs komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.teyitciRolleri = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu teyitciRolleri komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["warnHammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.warnHammer = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["banHammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.banHammer = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["jailHammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.jailHammer = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["VipHammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VipHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.VipHammer = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VipHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["cmuteHammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.cmuteHammer = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["vmuteHammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            pusha.vmuteHammer = rol, await pusha.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

    if(["erkekRolleri"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu erkek rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
    pusha.erkekRolleri = rol, await pusha.save() 
    message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu erkek rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["kizRolleri"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kadın rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
    pusha.kizRolleri = rol, await pusha.save() 
    message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kadın rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["vipRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vipRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.vipRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vipRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["boosterRolu"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu Booster rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.boosterRolu = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu Booster rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["unregRoles"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kayıtsız rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.unregRoles = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kayıtsız rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["çekilis"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu çekilis rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.çekilis = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu çekilis rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}


if(["etkinlik"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu etkinlik rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.etkinlik = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu etkinlik rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["film"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu film rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.film = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu film rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["jailRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.jailRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["VkCezalı"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VkCezalı rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.VkCezalı = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VkCezalı rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["DcCezalı"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu DcCezalı rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.DcCezalı = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu DcCezalı rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["chatMute"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatMute rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.chatMute = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatMute rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["voiceMute"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu voiceMute rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.voiceMute = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu voiceMute rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["fakeAccRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu fakeAccRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.fakeAccRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu fakeAccRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["reklamRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.reklamRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["yasaklıtagRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yasaklıtagRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.yasaklıtagRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yasaklıtagRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["uyariRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu uyariRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.uyariRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu uyariRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["katildiRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu katildiRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.katildiRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu katildiRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["mazaretliRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.mazaretliRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["enAltYetkiliRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu enAltYetkiliRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     pusha.enAltYetkiliRole = rol, await pusha.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu enAltYetkiliRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}



      
    }
}

