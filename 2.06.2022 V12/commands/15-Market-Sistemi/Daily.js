const Discord = require('discord.js') 
const ozi = require("../../schemas/dolar");
const { altin, altin2 } = require("../../configs/emojis.json")
let limit = new Map();

module.exports = {
    conf: {
      aliases: ["günlük"],
      name: "daily",
      help: "daily"
    },
  
run: async (client, message, args) => {

   if (!message.guild) return;

		let kanallar = ["kumarhane", "bot-commands"]
	if (!kanallar.includes(message.channel.name)) return message.lineReply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	
	
    let randomizeDolar = Math.floor(Math.random() * 450) + 1
     ozi.findOne({guildID: message.guild.id, userID: message.author.id}, async(err, data) => { 
 
    
        let timeout = 1000*60*60*24
        let gunluk = data.dolarTime
        if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
            let time = ms(timeout - (Date.now() - gunluk));
            message.reply(`Hey! Dur, günlük hediyeni zaten almışsın. Günlük hediyeni tekrardan alabilmen için ${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye daha beklemelisin.`)
        } else { 
                data.dolarTime = Date.now() 
                data.dolar = (data.dolar + randomizeDolar)
                data.save();
            message.reply(`${altin2}| Bugünlük **${randomizeDolar}** dolar aldın!`)
        }   
        
    }) 
}}
 
 

function ms(milliseconds) {
    return {
        days: Math.trunc(milliseconds / 86400000),
        hours: Math.trunc(milliseconds / 3600000) % 24,
        minutes: Math.trunc(milliseconds / 60000) % 60,
        seconds: Math.trunc(milliseconds / 1000) % 60,
        milliseconds: Math.trunc(milliseconds) % 1000,
        microseconds: Math.trunc(milliseconds * 1000) % 1000,
        nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
    };
}