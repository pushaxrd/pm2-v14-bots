const Discord = require("discord.js");
const { ozinitro, ozinetflix, ozispotify, oziexxen, oziblutv} = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: [],
    name: "ecrolalma",
    owner: true,
  },

  run: async (client, message, args) => {
    client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba **Marino** üyeleri,\nÇekiliş katılımcısı alarak ${ozinitro} , ${ozispotify} , ${ozinetflix} , ${oziexxen} , ${oziblutv} gibi çeşitli ödüllerin sahibi olabilirsiniz.\nEtkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz. \nFilm İzleyicisi = Sunucu içerisi olan Film, Film Geceleri, Netflix Yayınları etkinliklerden bildirim almak için gerekli rol!\n\n__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__\n @here @everyone`,"components":[{"type":1,"components":[

        {"type":2,"style":3,"custom_id":"buttoncekilis","label":"🎁 Çekiliş Katılımcısı"},
        {"type":2,"style":4,"custom_id":"buttonetkinlik","label":"🎉 Etkinlik Katılımcısı"},
        {"type":2,"style":2,"custom_id":"buttonfilm","label":"📺 Film Katılımcısı"}

        
        ]}]} })
  },
};

  
