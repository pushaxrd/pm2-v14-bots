const { Database } = require("ark.db");
const db = new Database("/src/configs/emojis.json");

module.exports = {
  conf: {
    aliases: [],
    name: "emojikur",
    owner: true,
  },

  run: async (client, message, args) => {
    const emojis = [
        { name: "star", url: "https://cdn.discordapp.com/emojis/924625742640349225.gif?size=40&quality=lossless" },
        { name: "revusome", url: "https://cdn.discordapp.com/emojis/924625730623668224.webp?size=40&quality=lossless" },
        { name: "miniicon", url: "https://cdn.discordapp.com/emojis/924625729700892695.webp?size=40&quality=lossless" },
        { name: "red", url: "https://cdn.discordapp.com/emojis/924625739477835816.gif?size=40&quality=lossless" },
        { name: "green", url: "https://cdn.discordapp.com/emojis/924625744339025951.gif?size=40&quality=lossless" },
        { name: "staff", url: "https://cdn.discordapp.com/emojis/924625723090665512.gif?size=40&quality=lossless" },
        { name: "Muhabbet", url: "https://cdn.discordapp.com/emojis/924625724357349396.gif?size=40&quality=lossless" },
        { name: "galp", url: "https://cdn.discordapp.com/emojis/924625733899391006.webp?size=40&quality=lossless" },
        { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/924625731617718272.gif?size=40&quality=lossless" },
        { name: "Revuu", url: "https://cdn.discordapp.com/emojis/924625738043383808.gif?size=40&quality=lossless" },
        { name: "Mute", url: "https://cdn.discordapp.com/emojis/924625730388770847.webp?size=40&quality=lossless" },
        { name: "ceza", url: "https://cdn.discordapp.com/emojis/924625726337069096.webp?size=40&quality=lossless" },
        { name: "Jail", url: "https://cdn.discordapp.com/emojis/924625728979496970.webp?size=40&quality=lossless" },
        { name: "Book", url: "https://cdn.discordapp.com/emojis/924625729826721802.webp?size=40&quality=lossless" },
        { name: "Kilit", url: "https://cdn.discordapp.com/emojis/924625730795626517.webp?size=40&quality=lossless" },
        { name: "Mute2", url: "https://cdn.discordapp.com/emojis/924625730569109525.webp?size=40&quality=lossless" },
        { name: "Unmute", url: "https://cdn.discordapp.com/emojis/924625730682384404.webp?size=40&quality=lossless" },
        { name: "gulucuk", url: "https://cdn.discordapp.com/emojis/924625729629610044.webp?size=40&quality=lossless" },
        { name: "rewards", url: "https://cdn.discordapp.com/emojis/924625728690073670.gif?size=40&quality=lossless" },
        { name: "altin", url: "https://cdn.discordapp.com/emojis/924625738789965844.gif?size=40&quality=lossless" },
        { name: "ozinitro", url: "https://cdn.discordapp.com/emojis/924625727553429524.webp?size=40&quality=lossless" },
        { name: "oziexxen", url: "https://cdn.discordapp.com/emojis/924625736118202390.webp?size=40&quality=lossless" },
        { name: "oziblutv", url: "https://cdn.discordapp.com/emojis/924625727272419328.webp?size=40&quality=lossless" },
        { name: "ozispotify", url: "https://cdn.discordapp.com/emojis/924625735166087258.webp?size=40&quality=lossless" },
        { name: "ozinetflix", url: "https://cdn.discordapp.com/emojis/924625730036445215.webp?size=40&quality=lossless" },
        { name: "channel", url: "https://cdn.discordapp.com/emojis/924625725514981406.webp?size=40&quality=lossless" },
        { name: "partner", url: "https://cdn.discordapp.com/emojis/935136070457241620.webp?size=40&quality=lossless" },
        { name: "online", url: "https://cdn.discordapp.com/emojis/935136070201409567.webp?size=40&quality=lossless" },
        { name : "duyuru", url: "https://cdn.discordapp.com/emojis/935136070377553930.webp?size=40&quality=lossless"},
        { name : "altin2", url: "https://cdn.discordapp.com/emojis/941275197829439540.gif?size=40&quality=lossless"},
        { name : "xp", url: "https://cdn.discordapp.com/emojis/924627372324552714.gif?size=40&quality=lossless"},
        { name : "voice", url: "https://cdn.discordapp.com/emojis/924625732792102942.webp?size=40&quality=lossless"},
        { name : "mesaj2", url: "https://cdn.discordapp.com/emojis/924625736621490186.gif?size=40&quality=lossless"},
        { name : "fillStart", url: "https://cdn.discordapp.com/emojis/924625729260511285.gif?size=40&quality=lossless"},
        { name : "fill", url: "https://cdn.discordapp.com/emojis/924625724961341471.gif?size=40&quality=lossless"},
        { name : "empty", url: "https://cdn.discordapp.com/emojis/924625724424462346.webp?size=40&quality=lossless"},
        { name : "fillEnd", url: "https://cdn.discordapp.com/emojis/924625725280096256.gif?size=40&quality=lossless"},
        { name : "emptyEnd", url: "https://cdn.discordapp.com/emojis/924625729977741332.webp?size=40&quality=lossless"},
        { name : "hosgeldin", url: "https://cdn.discordapp.com/emojis/924625722297962507.gif?size=40&quality=lossless"},
        { name : "slotgif", url: "https://cdn.discordapp.com/emojis/932044039010807828.gif?size=40&quality=lossless"},
        { name : "slotpatlican", url: "https://cdn.discordapp.com/emojis/932044155205587064.webp?size=40&quality=lossless"},
        { name : "slotkiraz", url: "https://cdn.discordapp.com/emojis/932044231411916840.webp?size=40&quality=lossless"},
        { name : "slotkalp", url: "https://cdn.discordapp.com/emojis/932044330628161536.webp?size=40&quality=lossless"}

    ]
 emojis.forEach(async (x) => {
      if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
      const emoji = await message.guild.emojis.create(x.url, x.name);
      await db.set(x.name, emoji.toString());
      message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
    });
    },
  };