const client = global.client;
const joinedAt = require("../schemas/voiceJoinedAt");
const voiceUser = require("../schemas/voiceUser");
const voiceGuild = require("../schemas/voiceGuild");
const guildChannel = require("../schemas/voiceGuildChannel");
const userChannel = require("../schemas/voiceUserChannel");
const userParent = require("../schemas/voiceUserParent");
const { MessageEmbed } = require("discord.js");
const coin = require("../schemas/coin");
const conf = require("../configs/sunucuayar.json");
const cfg = require("../configs/LeaderBoard.json");
const ayar = require("../configs/settings.json")
const dolar = require("../schemas/dolar")
const ms = require("ms");


module.exports = async (oldState, newState) => {
  if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
  
  
  const logKanal = oldState.guild.channels.cache.get(cfg.badges.prizeLog);
  const pubVeriler = await userParent.findOne({ guildID: oldState.guild.id, userID: oldState.id, parentID: cfg.katagoriParents });

  if (oldState.guild.roles.cache.get(cfg.badges.vbronze) && cfg.staffRoles.some((e) => oldState.member.roles.cache.get(e)) && !oldState.member.roles.cache.get(cfg.badges.vbronze) && parseInt(pubVeriler ? pubVeriler.parentData : 0) > ms(cfg.targetAmount.vbronze) && parseInt(pubVeriler ? pubVeriler.parentData : 0) < ms(cfg.targetAmount.vsilver)) {
    if (logKanal) logKanal.send(`🎉 ${oldState.member.toString()}, \`30 saat ses\` hedefine ulaştığı için \`${oldState.guild.roles.cache.get(cfg.badges.vbronze).name}\` rolünü kazandı!`);
    await oldState.member.roles.add(cfg.badges.vbronze, `Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vbronze).name}`);``

  } else if (oldState.guild.roles.cache.get(cfg.badges.vsilver) && cfg.staffRoles.some((e) => oldState.member.roles.cache.get(e)) && !oldState.member.roles.cache.get(cfg.badges.vsilver) && parseInt(pubVeriler ? pubVeriler.parentData : 0) > ms(cfg.targetAmount.vsilver) && parseInt(pubVeriler ? pubVeriler.parentData : 0) < ms(cfg.targetAmount.vgold)) {
    if (logKanal) logKanal.send(`🎉 ${oldState.member.toString()}, \`50 saat ses\` hedefine ulaştığı için \`${oldState.guild.roles.cache.get(cfg.badges.vsilver).name}\` rolünü kazandı!`);
    await oldState.member.roles.add(cfg.badges.vsilver, `Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vsilver).name}`);
    await oldState.member.roles.remove(cfg.badges.vbronze, `Eski Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vbronze).name}`);

  } else if (oldState.guild.roles.cache.get(cfg.badges.vgold) && cfg.staffRoles.some((e) => oldState.member.roles.cache.get(e)) && !oldState.member.roles.cache.get(cfg.badges.vgold) && parseInt(pubVeriler ? pubVeriler.parentData : 0) > ms(cfg.targetAmount.vgold) && parseInt(pubVeriler ? pubVeriler.parentData : 0) < ms(cfg.targetAmount.vdia)) {
    if (logKanal) logKanal.send(`🎉 ${oldState.member.toString()}, \`70 saat ses\` hedefine ulaştığı için \`${oldState.guild.roles.cache.get(cfg.badges.vgold).name}\` rolünü kazandı!`);
    await oldState.member.roles.add(cfg.badges.vgold, `Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vgold).name}`);
    await oldState.member.roles.remove(cfg.badges.vsilver, `Eski Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vsilver).name}`);

  } else if (oldState.guild.roles.cache.get(cfg.badges.vdia) && cfg.staffRoles.some((e) => oldState.member.roles.cache.get(e)) && !oldState.member.roles.cache.get(cfg.badges.vdia) && parseInt(pubVeriler ? pubVeriler.parentData : 0) > ms(cfg.targetAmount.vdia) && parseInt(pubVeriler ? pubVeriler.parentData : 0) < ms(cfg.targetAmount.vemerl)) {
    if (logKanal) logKanal.send(`🎉 ${oldState.member.toString()}, \`90 saat ses\` hedefine ulaştığı için \`${oldState.guild.roles.cache.get(cfg.badges.vdia).name}\` rolünü kazandı!`);
    await oldState.member.roles.add(cfg.badges.vdia, `Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vdia).name}`);
    await oldState.member.roles.remove(cfg.badges.vgold, `Eski Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vgold).name}`);

  } else if (oldState.guild.roles.cache.get(cfg.badges.vemerl) && cfg.staffRoles.some((e) => oldState.member.roles.cache.get(e)) && !oldState.member.roles.cache.get(cfg.badges.vemerl) && parseInt(pubVeriler ? pubVeriler.parentData : 0) > ms(cfg.targetAmount.vemerl)) {
    if (logKanal) logKanal.send(`🎉 ${oldState.member.toString()}, \`120 saat ses\` hedefine ulaştığı için \`${oldState.guild.roles.cache.get(cfg.badges.vemerl).name}\` rolünü kazandı!`);
    await oldState.member.roles.add(cfg.badges.vemerl, `Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vemerl).name}`);
    await oldState.member.roles.remove(cfg.badges.vdia, `Eski Ses Hedef Ödülü | ${oldState.guild.roles.cache.get(cfg.badges.vdia).name}`);
}


  if (!oldState.channelID && newState.channelID) await joinedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });

  let joinedAtData = await joinedAt.findOne({ userID: oldState.id });

  if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
  joinedAtData = await joinedAt.findOne({ userID: oldState.id });
  const data = Date.now() - joinedAtData.date;

  if (oldState.channelID && !newState.channelID) {
    await saveDatas(oldState, oldState.channel, data);
    await joinedAt.deleteOne({ userID: oldState.id });
  } else if (oldState.channelID && newState.channelID) {
    await saveDatas(oldState, oldState.channel, data);
    await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
  }
};

async function saveDatas(user, channel, data) {
  if (conf.staffs.some(x => user.member.roles.cache.has(x))) {
    if (channel.parent && conf.publicParents.includes(channel.parentID)) {
      if (data >= (1000 * 60) * ayar.voiceCount) await coin.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { coin: Math.floor(parseInt(data/1000/60) / ayar.voiceCount) * ayar.publicCoin } }, { upsert: true });
    } else if (data >= (1000 * 60) * ayar.voiceCount) await coin.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { coin: Math.floor(parseInt(data/1000/60) / ayar.voiceCount) * ayar.voiceCoin } }, { upsert: true });
    const coinData = await coin.findOne({ guildID: user.guild.id, userID: user.id });
    if (coinData && client.ranks.some(x => x.coin >= coinData.coin)) {
      let newRank = client.ranks.filter(x => coinData.coin >= x.coin);
      newRank = newRank[newRank.length-1];
      if (newRank && Array.isArray(newRank.role) && !newRank.role.some(x => user.member.roles.cache.has(x)) || newRank && !Array.isArray(newRank.role) && !user.member.roles.cache.has(newRank.role)) {
        const oldRank = client.ranks[client.ranks.indexOf(newRank)-1];
        user.member.roles.add(newRank.role);
        if (oldRank && Array.isArray(oldRank.role) && oldRank.role.some(x => user.member.roles.cache.has(x)) || oldRank && !Array.isArray(oldRank.role) && user.member.roles.cache.has(oldRank.role)) user.member.roles.remove(oldRank.role);
        const embed = new MessageEmbed().setColor("GREEN");
        user.guild.channels.cache.get(conf.rankLog).send(`${user.member.toString()} üyesi **${coinData.coin}** coin hedefine ulaştı ve **${Array.isArray(newRank.role) ? newRank.role.map(x => `${user.guild.roles.cache.get(x).name}`).join(", ") : `${user.guild.roles.cache.get(newRank.role).name}`}** rolü verildi! :tada: :tada:`);
      }
    }
  }

  if (channel.parent && conf.publicParents.includes(channel.parentID)) {
    if (data >= (1000 * 60) * ayar.voiceCount) await dolar.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dolar: ayar.voiceDolar * parseInt(data/1000/60) } }, { upsert: true });
  } else if (data >= (1000 * 60) * ayar.voiceCount) await dolar.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dolar: ayar.voiceDolar * parseInt(data/1000/60) } }, { upsert: true });

  await voiceUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true });
  await voiceGuild.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true });
  await guildChannel.findOneAndUpdate({ guildID: user.guild.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
  await userChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
  if (channel.parent) await userParent.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, parentID: channel.parentID }, { $inc: { parentData: data } }, { upsert: true });

}

module.exports.conf = {
  name: "voiceStateUpdate",
};