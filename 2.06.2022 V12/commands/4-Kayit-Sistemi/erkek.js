const coin = require("../../schemas/coin");
const toplams = require("../../schemas/toplams");
const kayitg = require("../../schemas/kayitgorev");
const settings = require("../../configs/settings.json")
const { red , green } = require("../../configs/emojis.json")
const isimler = require("../../schemas/names");
const regstats = require("../../schemas/registerStats");
const server = require("../../schemas/registerStats");

const otokayit = require("../../schemas/otokayit");
const serverSettings =require('../../models/sunucuayar')


const moment = require("moment")
moment.locale("tr")



module.exports = {
  conf: {
    aliases: ["erkek", "e", "man"],
    name: "erkek",
    help: "erkek [üye] [isim] [yaş]"
  },
run: async (client, message, args, embed, prefix) => { 
  if (!message.guild) return;
  let ayar = await serverSettings.findOne({
    guildID: message.guild.id
});

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!ayar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) {
    message.react(red)
    message.lineReply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x=> x.delete({timeout: 5000})) 
    return }
    if(!uye) 
    {
    message.react(red)
    message.lineReply(`\`${prefix}erkek <@Pusha/ID> <Isim> <Yaş>\``).then(x=>x.delete({timeout:5000})) 
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
    message.lineReply(`\`${prefix}erkek <@Pusha/ID> <Isim> <Yaş>\``).then(x=>x.delete({timeout:5000})) 
    return }

    if (yaş < settings.ageLimit)
    {
    message.react(red)
    message.lineReply(`Kayıt ettiğin üyenin yaşı 13'ten küçük olamaz.`).then(x => x.delete({timeout: 5000})); 
    return }
    
    if(ayar.erkekRolleri.some(oku => uye.roles.cache.has(oku)) && ayar.kizRolleri.some(oku => uye.roles.cache.has(oku))) { 
      message.react(red)
      message.lineReply(`Üye zaten kayıtlı!`).then(x=>x.delete({timeout: 5000}));
      return }
      if(!yaş) 
      { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
      } else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} ${yaş}`;
    }
  
    const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.user.username.includes(ayar.tag) && !uye.roles.cache.get(ayar.boosterRolu) && !ayar.vipRole.some(x => uye.roles.cache.get(x))) return message.lineReply(embed.setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız (\`${ayar.tag}\`) olmadığı, <@&${ayar.boosterRolu}>, <@&${ayar.vipRole}> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`));
    } 
    
    uye.setNickname(`${setName}`).catch(err => message.lineReply(`İsim çok uzun.`))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });
    message.react(green)
    message.lineReply(embed.setDescription(`
    ${uye.toString()} üyesinin ismi başarıyla \`${(setName)}\` olarak değiştirildi. Bu üye daha önce bu isimlerle kayıt olmuş.
    
    Kişinini toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu.
    ${data ? data.names.splice(0, 3).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol})  (<@${x.yetkili}>)`).join("\n") : ``}    
    
    Kişinin önceki isimlerine \`.isimler @Pusha/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir `)
.setFooter(`Toplam kayıt: ${datas ? datas.top : 0} | Erkek kayıt : ${datas ? datas.erkek : 0} | Kız kayıt : ${datas ? datas.kız : 0}`).setTimestamp()
.setAuthor(uye.displayName, uye.user.displayAvatarURL({ dynamic: true })))
    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: ayar.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send(`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`).then(x => x.delete({timeout: 10000})) 



let erkekRol = ayar.erkekRolleri;

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


}   