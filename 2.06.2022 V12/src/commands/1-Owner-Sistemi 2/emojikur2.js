const { Database } = require("ark.db");
const db = new Database("/src/configs/emojis2.json");

module.exports = {
  conf: {
    aliases: [],
    name: "emojikur2",
    owner: true,
  },

  run: async (client, message, args) => {
    const emojis = [
        { name: "bir", url: "https://cdn.discordapp.com/emojis/958300948114051072.gif?size=80&quality=lossless" },
        { name: "iki", url: "https://cdn.discordapp.com/emojis/958300990052913172.gif?size=80&quality=lossless" },
        { name: "üç", url: "https://cdn.discordapp.com/emojis/958300955588317215.gif?size=80&quality=lossless" },
        { name: "dort", url: "https://cdn.discordapp.com/emojis/958300960566960128.gif?size=80&quality=lossless" },
        { name: "beş", url: "https://cdn.discordapp.com/emojis/958300993718734878.gif?size=80&quality=lossless" },
        { name: "altı", url: "https://cdn.discordapp.com/emojis/958300974043263006.gif?size=80&quality=lossless" },
        { name: "yedi", url: "https://cdn.discordapp.com/emojis/958300983115522078.gif?size=80&quality=lossless" },
        { name: "sekiz", url: "https://cdn.discordapp.com/emojis/958300969706344448.gif?size=80&quality=lossless" },
        { name: "dokuz", url: "https://cdn.discordapp.com/emojis/958300965151330304.gif?size=80&quality=lossless" },
        { name: "sıfır", url: "https://cdn.discordapp.com/emojis/958300978673766430.gif?size=80&quality=lossless" }    
    ]
 emojis.forEach(async (x) => {
      if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
      const emoji = await message.guild.emojis.create(x.url, x.name);
      await db.set(x.name, emoji.toString());
      message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
    });
    },
  };







