const { MessageEmbed, Client } = require('discord.js');
const coin = require("../../schemas/coin");
const conf = require("../../configs/sunucuayar.json")
const ayar = require("../../configs/sunucuayar.json")
const toplams = require("../../schemas/toplams");
const Ayarlar = require("../../configs/sunucuayar.json");
const kayitg = require("../../schemas/kayitgorev");
const settings = require("../../configs/settings.json")
const { red , green } = require("../../configs/emojis.json")
const isimler = require("../../schemas/names");
const regstats = require("../../schemas/registerStats");
const server = require("../../schemas/registerStats");

const otokayit = require("../../schemas/otokayit");

const moment = require("moment")
moment.locale("tr")
const { MessageButton } = require('discord-buttons');


module.exports = {
  conf: {
    aliases: ["kayıt", "kayıt"],
    name: "kayıt",
    help: "kayıt [üye] [isim] [yaş]"
  },
run: async (client, message, args, embed, prefix) => { 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) {
    message.react(red)
    message.lineReply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x=> x.delete({timeout: 5000})) 
    return }
    if(!uye) 
    {
    message.react(red)
    message.lineReply(`\`${prefix}kayıt <@Pusha/ID> <Isim> <Yaş>\``).then(x=>x.delete({timeout:5000})) 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.lineReply(`Kendini kayıt edemezsin.`).then(x => x.delete({timeout: 5000})); 
    return }
    if(!uye.manageable) 
    {
    message.react(red)
    message.lineReply(`Böyle birisini kayıt edemiyorum.`).then(x => x.delete({timeout: 5000})); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(red)
    message.lineReply(`Senden yüksekte olan birisini kayıt edemezsin.`).then(x => x.delete({timeout: 5000})); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(red)
    message.lineReply(`\`${prefix}kayıt <@Pusha/ID> <Isim> <Yaş>\``).then(x=>x.delete({timeout:5000})) 
    return }

    const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.user.username.includes(ayar.tag) && !uye.roles.cache.has("923331950905794568") && !uye.roles.cache.has("923536502875623455")) return message.lineReply(embed.setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız (\`${ayar.tag}\`) olmadığı, <@&${ayar.boosterRolu}>, <@&${ayar.vipRole}> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`));
    }


    if(!yaş) 
    { setName =`${conf.tag} ${isim}`;
    } else { setName = `${conf.tag} ${isim} ${yaş}`;
  }

    uye.setNickname(`${setName}`).catch(err => message.lineReply(`İsim çok uzun.`))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });

    if(!uye.roles.cache.has(Ayarlar.erkekRolleri) && !uye.roles.cache.has(Ayarlar.kizRolleri)) {

    var button_1 = new MessageButton()
    .setID("MAN")
    .setLabel("Erkek")
    .setStyle("blurple")

    var button_2 = new MessageButton()
    .setID("WOMAN")
    .setLabel("Kadın")
    .setStyle("green")

    var button_3 = new MessageButton()
    .setID("İPTAL")
    .setLabel("İptal")
    .setStyle("red")

    let erkekRol = conf.erkekRolleri;
    let kadinRol = conf.kizRolleri;

    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });

    message.react(green)
    let pusha = new MessageEmbed()
.setDescription(`
${uye.toString()} kullanıcının adı başarıyla \`"${setName}"\` olarak değiştirildi.
**Bu kişi daha önce şu isimlerle kayıt olmuş;**
${data ? data.names.splice(0, 5).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) , (<@${x.yetkili}>)`).join("\n") : "Bu kullanıcı daha önce kayıt olmamış!"}
    `)
.setFooter(`Lütfen 30 saniye alttaki butonlara basarak kullanıcının cinsiyetini belirleyin.`)
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
   
 let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3 ], embed: pusha})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

if(button.id === "MAN") {
msg.delete();
await button.reply.defer()
message.lineReply(embed.setDescription(`
${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${conf.erkekRolleri.length > 1 ? conf.erkekRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.erkekRolleri.map(x => `<@&${x}>`).slice(-1) : conf.erkekRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi!     
`)
.setFooter(`• Toplam kayıt: ${datas ? datas.top : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • Kadın kayıt : ${datas ? datas.kız : 0} • ${moment().calendar()}`)
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 })))

    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.kizRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: conf.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send(`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000})) 

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: erkekRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if(button.id === "WOMAN") {
msg.delete();
await button.reply.defer()
 message.lineReply(embed.setDescription(`
${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${conf.kizRolleri.length > 1 ? conf.kizRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.kizRolleri.map(x => `<@&${x}>`).slice(-1) : conf.kizRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi! 
`)
.setFooter(`• Toplam kayıt: ${datas ? datas.top : 0} • Kadın kayıt : ${datas ? datas.kız : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • ${moment().calendar()}`)
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 })))

    await uye.roles.add(ayar.kizRolleri)
    await uye.roles.remove(ayar.erkekRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: conf.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send(`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000})) 

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: kadinRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if(button.id === "İPTAL") {
msg.delete();
uye.setNickname(`• İsim Yaş`)
await uye.roles.add(ayar.unregRoles)
await uye.roles.remove(ayar.kizRolleri)
await uye.roles.remove(ayar.erkekRolleri)
}

   });

    collector.on("end", async () => {
      msg.delete();
    });

  }
}   
}