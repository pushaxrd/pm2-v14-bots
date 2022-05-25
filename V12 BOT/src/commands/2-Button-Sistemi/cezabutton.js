const Discord = require("discord.js");
const { Jail } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: [],
    name: "cezabutton",
    owner: true,
  },

  run: async (client, message, args) => {
    client.api.channels(message.channel.id).messages.post({ data: {"content":`${Jail} Aşağıda ki düğmelerden ceza listenizi, ceza puanını ve aktif cezanızın kalan süresini görüntüleyebilirsiniz.\n@here @everyone`,"components":[{"type":1,"components":[

        {"type":2,"style":2,"custom_id":"cezapuan","label":"Ceza Puanı","emoji": { "id": "924625730682384404"}},
        {"type":2,"style":3,"custom_id":"cezalarım","label":"Cezalarım","emoji": { "id": "924625730682384404"}},
        {"type":2,"style":4,"custom_id":"kalanzaman","label":"Kalan Zamanım?","emoji": { "id": "924625730682384404"}}

        ]}]} })
  },
};

  
