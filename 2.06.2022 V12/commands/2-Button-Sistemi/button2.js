const Discord = require("discord.js");

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel2",
    owner: true,
  },

  run: async (client, message, args) => {
     client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\` Sunucusu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz komut için gerekli butonlara tıklamanız yeterli olucaktır!\n\n**XI:** \`Sunucumuzun invite komutlarına ulaşabilirsiniz\`\n**XII:** \`Sunucumuzun genel komutlarına ulaşabilirsiniz\`\n**XIII:** \`Sunucumuzun kayıt komutlarına ulasabilirsiniz\`\n\n**XIV:** \`Sunucumuzdaki kurucu komutlarına ulasabilirsiniz\`\n**XV:** \`Sunucumuzdaki moderasyon komutlarına ulasabilirsiniz\`\n**XVI:** \`Sunucumuzun stat komutlarına ulasabilirsiniz\`\n\n**XVII:** \`Sunucumuzun yetkili komutlarına ulasabilirsiniz\`\n**XVIII:** \`Sunucumuzun rol verme komutlarina ulasabilirsiniz\`\n**XIX:** \`Sunucumuzun rol verme 2 komutlarına ulasabilirsiniz\`\n`,
"components":[{
"type":1,"components":[
                         {"type":2,"style":3,"custom_id":"XI","label":"XI"},
                         {"type":2,"style":3,"custom_id":"XII","label":"XII"},
                         {"type":2,"style":3,"custom_id":"XIII","label":"XIII"},
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"XIV","label":"XIV"},
                         {"type":2,"style":3,"custom_id":"XV","label":"XV"},
                         {"type":2,"style":3,"custom_id":"XVI","label":"XVI"}
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"XVII","label":"XVII"},
                         {"type":2,"style":3,"custom_id":"XVIII","label":"XVIII"},
                         {"type":2,"style":3,"custom_id":"XIX","label":"XIX"}
       ]}


]}

 })
  },
};