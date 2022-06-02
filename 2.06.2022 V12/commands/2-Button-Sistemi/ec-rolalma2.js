const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: [],
    name: "ecrolalma2",
    owner: true,
  },

  run: async (client, message, args) => {
     client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\`  Rol seçmek için aşağıdaki gerekli butonlara tıklamanız yeterli olucaktır!\n\n**XXI:** \`Sunucumuzun LGBT Rolunu Alırsınız\`\n**XXII:** \`Sunucumuzun Sevgilim Var Rolunu Alırsınız\`\n**XXIII:** \`Sunucumuzun Sevgilim Yok Rolunu Alırsınız\`\n\n**XXIV:** \`Sunucumuzun Sevgili Yapmiyorum Rolunu Alırsınız\`\n**XXV:** \`Sunucumuzun Doğruluk Çesaretlik Rolunu Alırsınız\`\n**XXVI:** \`Sunucumuzun Vampir Köylü Rolunu Alırsınız\`\n`,
"components":[{
"type":1,"components":[
                         {"type":2,"style":3,"custom_id":"buttonlgbt","label":"XXI"},
                         {"type":2,"style":3,"custom_id":"buttonsevgilimvar","label":"XXII"},
                         {"type":2,"style":3,"custom_id":"buttonsevgilimyok","label":"XXIII"},
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"buttonsevgiliyapmiyorum","label":"XXIV"},
                         {"type":2,"style":3,"custom_id":"buttondcuye","label":"XXV"},
                         {"type":2,"style":3,"custom_id":"buttonvkuye","label":"XXVI"}

       ]}


]}

 })
  },
};