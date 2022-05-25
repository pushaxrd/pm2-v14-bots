const serverSettings =require('../../models/sunucuayar')
const { red, green} = require("../../configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["zengin","booster"],
      name: "zengin",
      help: "zengin"
    },
  
run: async (client, message, args, embed, prefix) => {

  if (!message.guild) return;
  let conf = await serverSettings.findOne({
    guildID: message.guild.id
});

    let booster = conf.boosterRolu || undefined;
    if(!booster) 
    {
    message.react(red)
    message.lineReply("Booster Rolu Bulunamadı! Lütfen Pusha'e ulaşın!").then(x => x.delete({timeout: 5000})); 
    return }
    if(!message.member.roles.cache.has(booster)) 
    {
    message.react(red)
    message.lineReply("Bu Komutu Kullanabilmek İçin Booster Rolüne Sahip Olmalısın!").then(x=> x.delete({timeout: 5000})) 
    return }
    let uye = message.guild.members.cache.get(message.author.id);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yazilacakIsim;
    if(!isim) 
    {
    message.react(red)
    message.lineReply("Geçerli bir isim belirtmelisin!").then(x => x.delete({timeout: 5000})); 
    return }
    yazilacakIsim = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`;
    uye.setNickname(`${yazilacakIsim}`).catch() 
    message.react(green)
    message.lineReply(`Başarıyla ismini \`${yazilacakIsim}\` olarak değiştirdim!`).then(x => x.delete({timeout: 5000}));
},
  };
  
  