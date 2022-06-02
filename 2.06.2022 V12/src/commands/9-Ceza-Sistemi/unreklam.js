const moment = require("moment");
moment.locale("tr");
const penals = require("../../schemas/penals");
const serverSettings =require('../../models/sunucuayar')
const settings = require("../../configs/settings.json")
const { red, green, Revuu} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["unreklam"],
    name: "unreklam",
    help: "unreklam"
  },

  run: async (client, message,  args, embed) => {
   
    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });
   
    if (!message.member.hasPermission(8) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react(red)
    message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000})) 
    return }
    if (!conf.reklamRole.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Bu üye Reklamda değil!").then(x=>x.delete({timeout:5000})) 
    return }
    if (!message.member.hasPermission(8) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( "Kendinle aynı yetkide ya da daha yetkili olan birinin reklami kaldıramazsın!").then(x=>x.delete({timeout:5000})) 
    return }
    if (!member.manageable) {
    message.react(red)  
    message.channel.send( "Bu üyeyi Reklamdan çıkaramıyorum!").then(x=>x.delete({timeout:5000})) 
    return }

    member.roles.set(conf.unregRoles);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "REKLAM" }, { type: "TEMP-REKLAM" }], active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.react(green)
    message.lineReply(`${green} ${member.toString()} üyesinin Reklami ${message.author} tarafından kaldırıldı!`).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, reklaminiz kaldırıldı!`).catch(() => {});

    const log = embed
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("#2f3136")
      .setDescription(`
      ${member.toString()} Adlı Kişinin Reklami Kaldırıldı
      
${Revuu} Reklami Kaldıran Kişi : ${message.author} (\`${message.author.id}\`)
          `)
          .setFooter(`${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(conf.reklamLogChannel).wsend(log);
  },
};

