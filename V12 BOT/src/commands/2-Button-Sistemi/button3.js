const { Discord, MessageButton, MessageActionRow } = require("discord.js");
const { green, red, Jail } = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.client;

module.exports = {
  conf: {
    aliases: [],
    name: "şüphelibutton",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    client.api.channels(message.channel.id).messages.post({
      data: {
        "content": `${Jail} Aşağıda ki düğmeden hesabınızın 7 gün süresini dolurmasına kalan süresini görüntüleyebilirsiniz ve tıklayarak şüpheliden çıkabilirsiniz.`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 4, "custom_id": "süpheli", "label": "Hesap Kontrol", "emoji": { "id": "916734243328114718" } },

          ]
        }]
      }
    })
  },
};