const disbut = require("discord-buttons");
const coin = require("../../schemas/coin");
const yetkis = require("../../schemas/yetkis");
const settings = require("../../configs/settings.json")
const serverSettings = require("../../models/sunucuayar")
const { red, green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["yetki-aldır", "yetkialdır", "yetkili","yetkiver"],
    name: "yetki-aldır",
    help: "yetki-aldır [kullanıcı]"
  },

  run: async (client, message, args, embed) => {
      
    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    let no = new disbut.MessageButton().setStyle('red').setLabel('Hayır').setID('cancel')
    let yes = new disbut.MessageButton().setStyle('green').setLabel('Evet').setID('yes')
      
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send("Bir üye belirtmelisin!").then(x => x.delete({timeout: 5000})); 
    return }
    if (!member.user.username.includes(conf.tag)) 
    {
    message.react(red)
    message.channel.send("Bu üye taglı değil!").then(x => x.delete({timeout: 5000})); 
    return }
    const yetkiData  = await yetkis.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (yetkiData  && yetkiData.yetkis.includes(member.user.id)) 
    {
    message.react(red)
    message.channel.send("Bu üyeye zaten daha önce yetki aldırılmış!").then(x => x.delete({timeout: 5000})); 
    return }

    message.channel.send( `${member.toString()}, ${message.member.toString()} üyesi sana yetki vermek istiyor. Kabul ediyor musun?`, { buttons: [yes, no] })
    .then(async (msg) => {
        
            client.on('clickButton', async (button) => {
    
    if(button.id === "yes") {
        
        await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: settings.yetkiCoin } }, { upsert: true });       
        msg.edit(`${member.toString()} üyesine başarıyla yetki aldırıldı! ${green}`, { buttons: [yes.setDisabled(true), no.setDisabled(true)] }).then(x => x.delete({timeout: 5000}))
        await yetkis.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { yetkis: member.user.id } }, { upsert: true });
       client.channels.cache.get(conf.yetkiLog).wsend(`${message.author} \`(${message.author.id}\` kişisi ${member} \`(${member.id})\` kişisini yetkiye aldı! ${green}`)
        member.roles.add(conf.yetkiRolleri)
        
    }
    
    if(button.id === "no"){
        
        msg.edit(`${member.toString()} üyesi, yetki aldırma teklifini reddetti! ${red}`, { buttons: [yes.setDisabled(true), no.setDisabled(true)] }).then(x => x.delete({timeout: 5000}))
        
    }
    })
    })
  }
}