const serverSettings = require('../models/sunucuayar')
const setting = require("../configs/settings.json")
const { MessageEmbed } = require("discord.js");


module.exports = async (oldState, newState) => {

    let conf = await serverSettings.findOne({
        guildID: setting.guildID
    });

const channel = newState.guild.channels.cache.get(conf.voiceLogChannel);
if (!channel) return;
if (!oldState.channel && newState.channel) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanala girdi!`);
if (oldState.channel && !newState.channel) return channel.wsend(`${newState.member.displayName} üyesi \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!`);
if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) return channel.wsend(`${newState.member.displayName} üyesi ses kanalını değiştirdi! (\`${oldState.channel.name}\` => \`${newState.channel.name}\`)`);
if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`);
if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!`);
if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`);
if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!`);
if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!`)
if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!`)
if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!`)
if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return channel.wsend(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!`)

};

module.exports.conf = {
  name: "voiceStateUpdate",
};



/**
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 */

 client.on("voiceStateUpdate", async (oldState, newState) => {
  let embed = new MessageEmbed()
  if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
  if(newState.member.hasPermission('ADMINISTRATOR') || newState.member.roles.cache.has(conf.boosterRolu)) return;
  let logKanali = newState.guild.channels.cache.find(x => x.name == "nsfw-log")
  if (oldState.member.nickname) {
      let ageLimit = oldState.member.nickname.includes(" ") && oldState.member.nickname.split("   ")[1] || 0
  if (!oldState.channelID && newState.channelID) {
      if (newState.channel && newState.channel.name.includes("+18")) {
          if(ageLimit < setting.onsekiz) {
              await logKanali.send(`${newState.member}`, {embed: embed.setDescription(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı \`${newState.channel.name}\` isimli kanaldan atıldı!`)})
              await newState.member.send(`${newState.member} **18 yaşından** küçük olduğun için \`${newState.channel.name}\` isimli kanaldan atıldın!`).catch(e => { });
              await newState.member.voice.kick().catch(e => { });
          }
      }
  }
  if (oldState.channelID && newState.channelID) {
      if (newState.channel && newState.channel.name.includes("+18")) {
          if(ageLimit < setting.onsekiz) {
              await logKanali.send(`${newState.member}`, {embed: embed.setDescription(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı \`${newState.channel.name}\` isimli kanaldan atıldı!`)})
              await newState.member.send(`${newState.member} **18 yaşından** küçük olduğun için \`${newState.channel.name}\` isimli kanaldan atıldın!`).catch(e => { });
              await newState.member.voice.kick().catch(e => { });
          }
      }
  }
}

})