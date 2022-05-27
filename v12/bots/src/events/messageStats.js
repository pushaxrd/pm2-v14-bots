const ayar = require("../configs/settings.json")
const messageUser = require("../schemas/messageUser");
const messageGuild = require("../schemas/messageGuild");
const guildChannel = require("../schemas/messageGuildChannel");
const userChannel = require("../schemas/messageUserChannel");
const coin = require("../schemas/coin");
const client = global.client;
const nums = new Map();
const mesaj = require("../schemas/mesajgorev");
const serverSettings = require("../models/sunucuayar");

const dolar = require("../schemas/dolar")
const cfg = require("../configs/LeaderBoard.json");


module.exports = async (message) => {

  let conf = await serverSettings.findOne({
    guildID: ayar.guildID
});

  if (message.author.bot || !message.guild || message.content.startsWith(ayar.prefix)) return;
  
  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
  const logKanal = message.guild.channels.cache.get(cfg.badges.prizeLog);

  if (message.guild.roles.cache.get(cfg.badges.cbronze) && cfg.staffRoles.some((e) => message.member.roles.cache.get(e)) && messageData && logKanal && !message.member.roles.cache.get(cfg.badges.cbronze) && ((messageData ? messageData.topStat : 0) > cfg.targetAmount.cbronze) && ((messageData ? messageData.topStat : 0) < cfg.targetAmount.csilver)) {
      logKanal.send(`${message.member.toString()}, \`${parseInt(cfg.targetAmount.cbronze).toLocaleString()} adet mesaj\` hedefine ulaştığı için \`${message.guild.roles.cache.get(cfg.badges.cbronze).name}\` rolünü kazandı!`);
      await message.member.roles.add(cfg.badges.cbronze, `Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.cbronze).name}`);
  } else if (message.guild.roles.cache.get(cfg.badges.csilver) && cfg.staffRoles.some((e) => message.member.roles.cache.get(e)) && messageData && logKanal && !message.member.roles.cache.get(cfg.badges.csilver) && ((messageData ? messageData.topStat : 0) > cfg.targetAmount.csilver) && ((messageData ? messageData.topStat : 0) < cfg.targetAmount.cgold)) {
      logKanal.send(`${message.member.toString()}, \`${parseInt(cfg.targetAmount.csilver).toLocaleString()} adet mesaj\` hedefine ulaştığı için \`${message.guild.roles.cache.get(cfg.badges.csilver).name}\` rolünü kazandı!`);
      await message.member.roles.add(cfg.badges.csilver, `Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.csilver).name}`);
      await message.member.roles.remove(cfg.badges.cbronze, `Eski Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.cbronze).name}`);
  } else if (message.guild.roles.cache.get(cfg.badges.cgold) && cfg.staffRoles.some((e) => message.member.roles.cache.get(e)) && messageData && logKanal && !message.member.roles.cache.get(cfg.badges.cgold) && ((messageData ? messageData.topStat : 0) > cfg.targetAmount.cgold) && ((messageData ? messageData.topStat : 0) < cfg.targetAmount.cdia)) {
      logKanal.send(`${message.member.toString()}, \`${parseInt(cfg.targetAmount.cgold).toLocaleString()} adet mesaj\` hedefine ulaştığı için \`${message.guild.roles.cache.get(cfg.badges.cgold).name}\` rolünü kazandı!`);
      await message.member.roles.add(cfg.badges.cgold, `Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.cgold).name}`);
      await message.member.roles.remove(cfg.badges.csilver, `Eski Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.csilver).name}`);
  } else if (message.guild.roles.cache.get(cfg.badges.cdia) && cfg.staffRoles.some((e) => message.member.roles.cache.get(e)) && messageData && logKanal && !message.member.roles.cache.get(cfg.badges.cdia) && ((messageData ? messageData.topStat : 0) > cfg.targetAmount.cdia) && ((messageData ? messageData.topStat : 0) < cfg.targetAmount.cemerl)) {
      logKanal.send(`${message.member.toString()}, \`${parseInt(cfg.targetAmount.cdia).toLocaleString()} adet mesaj\` hedefine ulaştığı için \`${message.guild.roles.cache.get(cfg.badges.cdia).name}\` rolünü kazandı!`);
      await message.member.roles.add(cfg.badges.cdia, `Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.cdia).name}`);
      await message.member.roles.remove(cfg.badges.cgold, `Eski Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.cgold).name}`);
  } else if (message.guild.roles.cache.get(cfg.badges.cemerl) && cfg.staffRoles.some((e) => message.member.roles.cache.get(e)) && messageData && logKanal && !message.member.roles.cache.get(cfg.badges.cemerl) && ((messageData ? messageData.topStat : 0) > cfg.targetAmount.cemerl)) {
      logKanal.send(`${message.member.toString()}, \`${parseInt(cfg.targetAmount.cemerl).toLocaleString()} adet mesaj\` hedefine ulaştığı için \`${message.guild.roles.cache.get(cfg.badges.cemerl).name}\` rolünü kazandı!`);
      await message.member.roles.add(cfg.badges.cemerl, `Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.cemerl).name}`);
      await message.member.roles.remove(cfg.badges.cdia, `Eski Mesaj Hedef Ödülü | ${message.guild.roles.cache.get(cfg.badges.cdia).name}`);
  }

  if (cfg.staffs.some(x => message.member.roles.cache.has(x))) {
    const num = nums.get(message.author.id);
    if (num && (num % ayar.messageCount) === 0) {
      nums.set(message.author.id, num + 1);
      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { coin: ayar.messageCoin } }, { upsert: true });
      const coinData = await coin.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (coinData && client.ranks.some(x => coinData.coin === x.coin)) {
        let newRank = client.ranks.filter(x => coinData.coin >= x.coin);
        newRank = newRank[newRank.length-1];
        const oldRank = client.ranks[client.ranks.indexOf(newRank)-1];
        message.member.roles.add(newRank.role);
        if (oldRank && Array.isArray(oldRank.role) && oldRank.role.some(x => message.member.roles.cache.has(x)) || oldRank && !Array.isArray(oldRank.role) && message.member.roles.cache.has(oldRank.role)) message.member.roles.remove(oldRank.role);
        message.guild.channels.cache.get(cfg.rankLog).send(`${message.member.toString()} üyesi **${coinData.coin}** coin hedefine ulaştı ve **${Array.isArray(newRank.role) ? newRank.role.map(x => `${message.guild.roles.cache.get(x).name}`).join(", ") : `${message.guild.roles.cache.get(newRank.role).name}`}** rolü verildi! :tada: :tada:`);
      }
    } else nums.set(message.author.id, num ? num + 1 : 1);
  }

  await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
  await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
  await guildChannel.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
  await userChannel.findOneAndUpdate({ guildID: message.guild.id,  userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
  if(dolar) {
  if(message.channel.id !== conf.chatChannel) return;
  await dolar.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dolar: ayar.messageDolar } }, { upsert: true });
  }
const mesajData = await mesaj.findOne({ guildID: message.guild.id, userID: message.author.id });
if(mesajData){
if(message.channel.id !== conf.chatChannel ) return;
await mesaj.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { mesaj: 1 } }, { upsert: true });
}
};

module.exports.conf = {
  name: "message",
};
