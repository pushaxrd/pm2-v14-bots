const { Client, Collection, Discord } = require("discord.js");
require("discord-reply")
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const settings = require("./src/configs/settings.json");
const configs = require("./src/configs/LeaderBoard.json");

const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const map = new Map();
const lımıt = 4;
const TIME = 180000;
const DIFF = 2000;

//RANK KISMI//

client.ranks = [ 

  { role: "945760985719914590", coin: 12000 },
  { role: "945760985707339844", coin: 12000 },
  { role: "945760985707339843", coin: 12000 },

  { role: "945760985719914591", coin: 14000 },
  { role: "945760985719914592", coin: 18000 },
  { role: "945760985719914593", coin: 20000 },
  { role: "945760985719914594", coin: 22000 },

  { role: "945760985719914595", coin: 26000 },
  { role: "945760985707339836", coin: 26000 },
  { role: "945760985707339837", coin: 26000 },
  { role: "945760985707339845", coin: 26000 },


  { role: "945760985719914597", coin: 28000 },
  { role: "945760985736708186", coin: 30000 },
  { role: "945760985736708187", coin: 32000 },

  { role: "945760985736708189", coin: 34000 },
  { role: "945760985707339838", coin: 34000 },
  { role: "945760985707339845", coin: 34000 },


  { role: "945760985736708190", coin: 38000 },
  { role: "945760985736708191", coin: 40000 },

  { role: "945760985736708193",  coin: 42000 },
  { role: "945760985707339839", coin: 42000 },
  { role: "945760985753456731", coin: 42000 },


  { role: "945760985736708194", coin: 44000 },
  { role: "945760985736708195", coin: 46000 },
  
  ]

  //KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[pusha] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[pusha KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client.login(settings.token).then(() => console.log("Bot Başarıyla Bağlandı!")).catch(() => console.log("[HATA] Bot Bağlanamadı!"));


  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });



setInterval(() => {
  let GuildID = configs.GuildID
  let OneMonth = configs.BirAy
  let ThreeMonth = configs.UcAy
  let SixMonth = configs.AltiAy
  let NineMonth = configs.DokuzAy
  let OneYear = configs.BirYil
  const server = client.guilds.cache.get(GuildID); 
  server.members.cache.forEach(async member => {
if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 30) {await member.roles.add(OneMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 90) {await member.roles.remove(OneMonth)
  await member.roles.add(ThreeMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 180) {await member.roles.remove(ThreeMonth)
await member.roles.add(SixMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 270) {await member.roles.remove(SixMonth)
  await member.roles.add(NineMonth)}

  if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365) {await member.roles.remove(NineMonth)
    await member.roles.add(OneYear)}

        })
  }, 1000 * 60 * 60 * 24 * 7)


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
