const Discord = require("discord.js");
const settings = require("../../configs/settings.json");
const sema = require("../../models/sunucuayar")

module.exports = {
  conf: {
    aliases: ["semakur"],
    name: "semakur",
    owner: true,
  },

  run: async (client, message, args) => {
   
    sema.findOne({guildID: message.guild.id }, async (err, doc) => {
            if(!doc){
            const newData = new sema({
          })
            newData.save().catch(e => console.log(e))}
        if(doc) return
        })
        message.channel.send(`Bot kurulumu tamamlandı.`) }
};
