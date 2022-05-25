const client = global.client;

module.exports = async (guild) => {
  const invites = await guild.fetchInvites();
  gi.delete(guild.id.code);
  client.invites.set(guild.id, invites);
};

module.exports.conf = {
  name: "guildDelete",
};