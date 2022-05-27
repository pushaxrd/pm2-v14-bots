const serverSettings =require('../models/sunucuayar')
const ayar = require("../configs/settings.json")

const moment = require("moment");
moment.locale("tr");

module.exports = async (button) => {
  
  let conf = await serverSettings.findOne({
    guildID: ayar.guildID
});

const member = await client.guilds.cache.get(ayar.guildID).members.fetch(button.clicker.member.id)
if (!member) return;

if(button.id === "süpheli") {
if (!member.roles.cache.has(conf.fakeAccRole)) {
await button.reply.think(true)
await button.reply.edit(`Şüpheli Hesap değilsiniz.`);
return }

let guvenilirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;
if (guvenilirlik) {
await button.reply.think(true)
await button.reply.edit(`Hesabınız şüpheli kategorisinden çıkmaya uygun değildir.`);
} else {
await button.reply.think(true)
await button.reply.edit(`7 gün süreniz dolduğu için karantinadan çıkarıldınız.`);
await member.roles.set(conf.unregRoles)
}}

}
module.exports.conf = {
  name: "clickButton"
};