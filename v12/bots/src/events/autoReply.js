const serverSettings = require('../models/sunucuayar')
const settings = require('../configs/settings.json')

const { green } = require("../configs/emojis.json");

module.exports = async (message) => {

  if (!message.guild) return;
  let conf = await serverSettings.findOne({
    guildID: settings.guildID
});

  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    message.react(green);
    message.lineReply(conf.tag);
  }
};
module.exports.conf = {
  name: "message"
};