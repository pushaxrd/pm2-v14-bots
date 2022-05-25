const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const ReklamLimit = new Map();
const ms = require("ms")
moment.locale("tr");
const serverSettings =require('../../models/sunucuayar')
const settings = require("../../configs/settings.json")
const { red, green, Revuu, kirmiziok } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["reklam"],
    name: "reklam",
    help: "reklam"
  },

  run: async (client, message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if (!message.member.hasPermission(8) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000}))
    message.react(red) 
    return }
    if (conf.reklamRole.some(x => member.roles.cache.has(x))) { message.channel.send( "Bu üye zaten reklamda!").then(x=>x.delete({timeout:5000}))
    message.react(red) 
    return }
    const reason = args.slice(2).join(" ") || "Reklam!";
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini reklamleyemezsin!"));
    if (!member.manageable) return message.channel.send( "Bu üyeyi reklamleyemiyorum!");
    if (settings.ReklamLimit > 0 && ReklamLimit.has(message.author.id) && ReklamLimit.get(message.author.id) == settings.ReklamLimit) 
    {
    message.react(red)
    message.channel.send( "Saatlik reklam sınırına ulaştın!").then(x=>x.delete({timeout:5000})) 
    return }
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { ReklamAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -10 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send(`${member} üyesi \`reklam cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`);
    member.roles.set(conf.reklamRole);
    message.react(green)
    const penal = await client.penalize(message.guild.id, member.user.id, "REKLAM", true, message.author.id, reason);
    message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle reklamlendi! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiylereklamlendiniz.`).catch(() => {});
    

    const log = embed
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Reklama Atıldı

${Revuu} Reklam Atan Kişi : ${message.author} (\`${message.author.id}\`)
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter(`${moment(Date.now()).format("LLL")}`)

    message.guild.channels.cache.get(conf.reklamLogChannel).wsend(log);

    if (settings.ReklamLimit > 0) {
      if (!ReklamLimit.has(message.author.id)) ReklamLimit.set(message.author.id, 1);
      else ReklamLimit.set(message.author.id, ReklamLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (ReklamLimit.has(message.author.id)) ReklamLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  },
};

