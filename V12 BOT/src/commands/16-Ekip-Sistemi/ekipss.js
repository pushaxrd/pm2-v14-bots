const { Discord, MessageAttachment, MessageEmbed } = require('discord.js');
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const { partner, online, duyuru, channel } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["ekip-all"],
    name: "ekip-all",
    help: "ekip-all"
  },

  run: async (client, message, args ) => {

    let bindok = message.guild.roles.cache.get("955565126336020581")
    let mühür = message.guild.roles.cache.get("955565907411886150")

        
    const ekipsesbindok = `${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(bindok.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(bindok.id)).size * 100)}`
    const mühürlendiniz = `${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(mühür.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(mühür.id)).size * 100)}`
         const datas = [
            {
                "ekipses": ekipsesbindok,
                "ekipisim": "1935" 
            },
            { 
                "ekipses": mühürlendiniz,
                "ekipisim": "1841"
            },
         
          
        ]
const ses = []
const ekipisim = []
for ( const item of datas) {
  ses.push(item.ekipses)
  ekipisim.push(item.ekipisim)
}
const width = 500
const height = 300
const chartCallBack = (ChartJS) => { }
const canvas = new ChartJSNodeCanvas({
  width, 
  height,
  chartCallBack
})
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
        }
        async function ImageFromData(body, w = 600, h = 290) {
            return await fromImage(body, w, h);
        };
        async function fromImage(config, w, h) {
            let crs = new ChartJSNodeCanvas({ width: w, height: h });
            return await crs.renderToBuffer(config);
        };
let buffer = await ImageFromData({
    width: 600,
    height: 290,
  type: 'bar',
  data: { 
    labels: [].concat(ekipisim),
    datasets: [
      { 
        label: "EKİPLERİN AKTİFLİK GRAFİĞİ", 
        data: ses,
        backgroundColor: getRandomColor()
      }
    ]
  }
})
//const image = await canvas.renderToBuffer(configs)
//const attachment = new Discord.MessageAttachment(image)
let foto;
let attachments = new MessageAttachment(buffer, "Ozi.png");

let ozi = new MessageEmbed() 
             .setTimestamp()
             .setFooter(`Toplam ses ortalaması: %${parseInt(message.guild.members.cache.filter(x => !x.roles.cache.has(bindok.id) && !x.roles.cache.has(mühür.id) && x.voice.channel).size / message.guild.members.cache.filter(x=>x.voice.channel).size * 100)}`)
             .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
             .setImage("attachment://Ozi.png") 
            
             .addField(`Sante #3935 Bilgilendirme:`,`
${partner} Toplam Üye : ${message.guild.members.cache.filter(b => b.roles.cache.has(bindok.id)).size}
${online} Aktif Üye : ${message.guild.members.cache.filter(c => c.roles.cache.has(bindok.id) && c.presence && c.presence.status !== 'offline').size}
${duyuru} Sesteki Üye: ${message.guild.members.cache.filter(x => x.roles.cache.has(bindok.id) && x.voice.channel).size}
${channel} Ses Oranı : %${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(bindok.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(bindok.id)).size * 100)} 
`,true)
            .addField(`Rate #1841 Bilgilendirme:`,`
${partner} Toplam Üye : ${message.guild.members.cache.filter(b => b.roles.cache.has(mühür.id)).size}
${online} Aktif Üye : ${message.guild.members.cache.filter(c => c.roles.cache.has(mühür.id) && c.presence && c.presence.status !== 'offline').size}
${duyuru} Sesteki Üye: ${message.guild.members.cache.filter(x => x.roles.cache.has(mühür.id) && x.voice.channel).size}
${channel} Ses Oranı : %${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(mühür.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(mühür.id)).size * 100)} 
`,true)

message.channel.send({ embed: ozi, files: [attachments] })

},
}