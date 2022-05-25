const serverSettings =require('../../models/sunucuayar')
const { kirmiziok, star, Revuu } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["seslisay","sesli"],
    name: "seslisay",
    help: "seslisay"
  },

  run: async (client, message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
{
  message.react(red)  
  return
}
    let tag = conf.tag;
    let pubID = conf.publicParents;

    let topses = message.guild.members.cache.filter(s => s.voice.channel);
    let tagses = topses.filter(s => s.user.username.includes(tag));
    let pubses = message.guild.channels.cache.filter(x => x.parentID == conf.PublicParent && x.type == "voice");

    let yayın = topses.filter(s => s.voice.streaming);
    let mik = topses.filter(s => s.voice.selfMute).size;
    let kulak = topses.filter(s => s.voice.selfDeaf).size;
    let bot = topses.filter(s => s.user.bot);
    let count = 1;
    let topCategory = message.guild.channels.cache.filter(s => s.type === 'category').sort((a, b) => Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentID === b.id).size - Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentID === a.id).size))).map((c, index) => `${count++}. \`#${c.name}\`: \`${c.members.filter(s => s.voice.channel && s.voice.channel.parentID === c.id).size}\``).splice(0, 3).join('\n');
    let yetkili = message.guild.members.cache.filter(x => {
      return x.user.username.includes(conf.tag) && x.voice.channel && x.roles.cache.has(conf.ekipRolu)
  }).size

    embed.setDescription(`
${star} Sesli kanallarda toplam **${topses.size}** kişi var !

${kirmiziok} Public odalarda **${pubses.size}** kişi var !
${kirmiziok} Ses kanallarında **${tagses.size}** taglı kullanıcı var !
${kirmiziok} Ses kanallarında **${yetkili}** yetkili var !

${kirmiziok} Ses kanallarında **${yayın.size}** kişi yayın yapıyor !
${kirmiziok} Mikrofonu kapalı: **${mik}**
${kirmiziok} Kulaklığı kapalı: **${kulak}**

${Revuu} **Top 3 kategori sırası**
${topCategory || 'Boş'}
`)


    message.channel.send(embed)
}
}

