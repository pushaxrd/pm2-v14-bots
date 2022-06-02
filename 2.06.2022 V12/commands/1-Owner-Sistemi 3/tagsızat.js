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
        guildID: message.guild.id 
    });

    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(`Developer By Pusha`)
    let tag = "✰"
    let boosterRol = "945761792846626866"
    let viprol = "945760985673764965"
    let kayıtsızRol = "945760985648607321"
    message.guild.members.cache.filter(s => !s.user.username.includes(tag) && !s.roles.cache.has(boosterRol) && !s.roles.cache.has(viprol) &&
 !s.roles.cache.has(kayıtsızRol)).forEach(async(member) => {
        setTimeout(async() => {
            member.roles.set([kayıtsızRol])
        }, 1000)
    })
    message.channel.send(embed.setDescription(`Kullanıcı adında tag bulunmayan kullanıcılar kayıtsıza atılıyor.`))

 },
};
