const disbut = require("discord-buttons");
const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const tagli = require("../../schemas/taggorev");
const serverSettings =require('../../models/sunucuayar')
const settings = require("../../configs/settings.json")
const { red, green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["tag-aldır", "taglıaldır", "taglı"],
    name: "tagaldır",
    help: "tagaldır [kullanıcı]"
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
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (taggedData && taggedData.taggeds.includes(member.user.id)) 
    {
    message.react(red)
    message.channel.send("Bu üyeye zaten daha önce tag aldırmışsın!").then(x => x.delete({timeout: 5000})); 
    return }

    message.channel.send( `${member.toString()}, ${message.member.toString()} üyesi sana tag aldırmak istiyor. Kabul ediyor musun?`, { buttons: [yes, no] }).then(async (msg) => {
    
    client.on('clickButton', async (button) => {
    
    if(button.id === "yes") {
        
        await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: settings.taggedCoin } }, { upsert: true });
        const tagData = await tagli.findOne({ guildID: message.guild.id, userID: message.author.id });
        if (tagData)
        {
        await tagli.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { tagli: 1 } }, { upsert: true });
        }
        msg.edit(`${member.toString()} üyesine başarıyla tag aldırıldı! ${green}`,  { buttons: [yes.setDisabled(true), no.setDisabled(true)] }).then(x => x.delete({timeout: 5000}))
        await taggeds.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { taggeds: member.user.id } }, { upsert: true });
        
    }
    
    if(button.id === "no"){
        
                msg.edit(`${member.toString()} üyesi, tag aldırma teklifini reddetti! ${red}`, { buttons: [yes.setDisabled(true), no.setDisabled(true)] }).then(x => x.delete({timeout: 5000}))
        
    }
    
    })

})

  }
}