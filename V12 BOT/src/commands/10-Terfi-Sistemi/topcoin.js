const coin = require("../../schemas/coin");
const serverSettings =require('../../models/sunucuayar')

module.exports = {
  conf: {
    aliases: [],
    name: "topcoin",
    help: "topcoin"
  },
  
  run: async (client, message, args, embed) => { 

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

const coinData = await coin.find({ guildID: message.guild.id }).sort({ coin: -1 });
let coinSum = 0;
const coinUsers = coinData.splice(0, 50).map((x, index) => {
coinSum += x.coin;
return `\`${index+1}.\` <@${x.userID}>: \`${Number(x.coin).toLocaleString()} coin\``
}).join(`\n`);
message.channel.send(embed.setDescription(`
** ${message.guild} Toplam Coin Bilgileri: \`(Toplam ${coinSum})\`**
${coinUsers.length > 0 ? coinUsers : "Veri Bulunmuyor."}
`))   
}}