const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const { red , green } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: [],
    name: "topluban",
    owner: true,
  },

  run: async (client, message, args) => {

        if (args.length < 1)
        return message.lineReply(
            "Banlanacak kişilerin ID'lerini belirt.",
        )
       const members = args
        .filter((id) => message.guild.members.cache.has(id))
        .map((id) => message.guild.member(id));
    if (members.length < 1)
        return message.lineReply(
            "Banlanacak kişilerin sunucuda olması gerekir.",
        );
        
    const ozicik = await message.lineReply(
        `${members
            .map((member, idx) => `**${idx + 1}. ${member.toString()}**`)
            .join("\n")}\nBu üyeleri banlamak istiyor musun?`,
    );
    await ozicik.react(green);
    const collector = ozicik.createReactionCollector(
        (reaction, user) =>
            reaction.emoji.name === 'green' && user.id === message.author.id,
        { time: 1000 * 10 },
    );

    collector.on("collect", async () => {
        await ozicik.edit(`${green} ${members.length} adet kullanıcı başarıyla yasaklandı.`);
        for (const member of members) {
            if (member.bannable)
                await member.ban({ days: 7, reason: "Toplu ban" });
        }
        collector.stop();
    });

    collector.on("end", (_, reason) => {
        console.log("end", reason);
        if (reason === "time")
            ozicik.edit("10 saniye geçtiği için işlem iptal edildi.");
    });
    
}
}