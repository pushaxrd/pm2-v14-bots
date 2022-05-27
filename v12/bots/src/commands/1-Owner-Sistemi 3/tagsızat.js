const { MessageEmbed } = require("discord.js");
const settings = require("../../configs/settings.json");
const serverSettings = require('../../models/sunucuayar')


module.exports = {
conf:{
aliases: ["tagsızat"],
name: "tagsızat",
help: "tagsızat"
},
run: async(client, message, args) => {

    let conf = await serverSettings.findOne({
        guildID: settings.guildID
    });

    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(`Developer By Pusha`)
    let tag = conf.tag
    let boosterRol = conf.boosterRolu 
    let viprol = conf.vipRole
    let kayıtsızRol = conf.unregRoles
    message.guild.members.cache.filter(s => !s.user.username.includes(tag) && !s.roles.cache.has(boosterRol) && !s.roles.cache.has(viprol) &&
 !s.roles.cache.has(kayıtsızRol)).forEach(async(member) => {
        setTimeout(async() => {
            member.roles.set([kayıtsızRol])
        }, 1000)
    })
    message.channel.send(embed.setDescription(`Kullanıcı adında tag bulunmayan kullanıcılar kayıtsıza atılıyor.`))

 },
};
