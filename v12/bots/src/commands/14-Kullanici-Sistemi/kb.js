const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js") 
const moment = require('moment');
require("moment-duration-format");
moment.locale('tr');
module.exports = {
    conf: {
      aliases: ["kb"],
      name: "kb",
      help: "kb"
    },
  
run: async (client, message, args, embed, prefix) => {


  const kullanıcı = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let member = message.guild.member(kullanıcı);


  const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};
	const canvas = Canvas.createCanvas(600, 550);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://media.discordapp.net/attachments/831976699960885319/843071494220414986/universe-2303321_960_720.png?width=490&height=553');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

  let yazıqwe = `${member.user.username}`
  if(yazıqwe.length >= 17) {yazı = `İsmin Çok Uzun`}
  ctx.font ='45px bebas neue',
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${yazıqwe}`, canvas.width / 2.50, canvas.height / 7);

  ctx.font ='28px bebas neue',
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${message.author.id}`, canvas.width / 2.60, canvas.height / 4.2);

  ctx.font ='30px bebas neue',
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Sunucuya Giriş Tarihi:`, canvas.width / 11, canvas.height / 2);

  let ktarihi = `${moment(member.joinedAt).format(`DD/MM/YYYY`)}`
  ctx.font ='30px bebas neue',
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${ktarihi}`, canvas.width / 1.50 , canvas.height / 2);

  let otarihi = `${moment(member.createdAt).format(`DD/MM/YYYY`)}`
  ctx.font ='30px bebas neue',
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${otarihi}`, canvas.width / 1.50 , canvas.height / 2.60);

  ctx.font ='30px bebas neue',
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Discorda Katılım Tarihi:`, canvas.width / 11, canvas.height / 2.60);
 
  let ta = `Katılım Sırası:
${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}`
  ctx.font ='28px bebas neue',
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${ta}`, canvas.width / 1.80, canvas.height / 1.55);

  let roll = `Rolleri : 
${member.roles.cache.size <= 4 ? member.roles.cache.filter(x => x.name !== "@everyone").map(x => x.name).join('\n') : `Listelenemedi. (${member.roles.cache.size})`}`
  ctx.font ='28px bebas neue',
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${roll}`, canvas.width / 11, canvas.height / 1.55);


	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 40, 40, 125, 125);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'aias.png');
  message.channel.send(`[ __${member}__ ] kişisinin kullanıcı profili ;`, attachment)
    }}