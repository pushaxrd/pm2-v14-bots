const Discord = require("discord.js");

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel1",
    owner: true,
  },

  run: async (client, message, args) => {
     client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\` sunucusu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli butonlara tıklamanız yeterli olucaktır!\n\n**1:** Sunucuya giriş yaptığınız tarihi öğrenin.\n**2:** Sunucu üzerinde bulunan rollerinizi öğrenin.\n**3:** Hesabınızın açılış tarihini öğrenin.\n\n**4:** Davet bilgilerinizi öğrenin.\n**5:** Tekrardan kayıt olun.\n**6:** Sunucumuzun anlık aktif sesini öğrenin.\n\n**7:** Sunucuda eskiden kayıt olduğunuzdaki isim bilgilerinizi görüntüleyin \n**8:** Sunucu içerisindeki toplam atınız mesaj sayılarını gösterir.\n**9:** Sunucu ses kanallarında toplam geçirdiğiniz süreyi öğrenin.\n`,
"components":[{
"type":1,"components":[
                         {"type":2,"style":1,"custom_id":"I","label":"1"},
                         {"type":2,"style":1,"custom_id":"II","label":"2"},
                         {"type":2,"style":1,"custom_id":"III","label":"3"}
       ]}, {  "type":1,"components":[
                         {"type":2,"style":1,"custom_id":"IV","label":"4"},
                         {"type":2,"style":1,"custom_id":"V","label":"5"},
                         {"type":2,"style":1,"custom_id":"VI","label":"6"}
       ]}, {  "type":1,"components":[
                         {"type":2,"style":1,"custom_id":"VII","label":"7"},
                         {"type":2,"style":1,"custom_id":"VIII","label":"8"},
                         {"type":2,"style":1,"custom_id":"IX","label":"9"}
        ]},



]}

 })
  },
};
///"style":1 mavi
///"style":2 gri
///"style":3 yesil
///"style":4 kırmızı
