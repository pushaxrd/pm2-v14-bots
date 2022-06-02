let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let serverSettings = Schema({
 

// GUILD

guildID: {
    type: String,
    default: ""
},

// OWNER 

guildowner: {
    type: Array,
    default: []
},
 
rolverici: {
    type: Array,
    default: []
},

sahipRolu: {
    type: Array,
    default: []
},

owner: {
    type: Array,
    default: []
},

ceo: {
    type: Array,
    default: []
},

yıldız: {
    type: Array,
    default: []
},

//FAMİLY

tag: {
    type: String,
    default: ""
},

ikinciTag: {
    type: String,
    default: ""
},

ekipRolu: {
    type: Array,
    default: []
},

// Yetkili Roller

staffs: {
    type: Array,
    default: []
},

teyitciRolleri: {
    type: Array,
    default: []
},

warnHammer: {
    type: Array,
    default: []
},

banHammer: {
    type: Array,
    default: []
},

jailHammer: {
    type: Array,
    default: []
},

VipHammer: {
    type: Array,
    default: []
},

cmuteHammer: {
    type: Array,
    default: []
},

vmuteHammer: {
    type: Array,
    default: []
},

// Sunucu Rol
erkekRolleri: {
    type: Array,
    default: []
},

kizRolleri: {
    type: Array,
    default: []
},

vipRole: {
    type: Array,
    default: []
},

boosterRolu: {
    type: Array,
    default: []
},

unregRoles: {
    type: Array,
    default: []
},

çekilis: {
    type: Array,
    default: []
},

etkinlik: {
    type: Array,
    default: []
},

film: {
    type: Array,
    default: []
},


//Ceza Rol

jailRole: {
    type: Array,
    default: []
},

VkCezalı: {
    type: Array,
    default: []
},

DcCezalı: {
    type: Array,
    default: []
},

chatMute: {
    type: Array,
    default: []
},

voiceMute: {
    type: Array,
    default: []
},

fakeAccRole: {
    type: Array,
    default: []
},

reklamRole: {
    type: Array,
    default: []
},

yasaklıtagRole: {
    type: Array,
    default: []
},

//Toplanti 

uyariRole: {
    type: Array,
    default: []
},

katildiRole: {
    type: Array,
    default: []
},

mazaretliRole: {
    type: Array,
    default: []
},

enAltYetkiliRole: {
    type: Array,
    default: []
},

// KATAGORİ

publicParents: {
    type: String,
    default: ""
},

privateParents: {
    type: String,
    default: ""
},

aloneParents: {
    type: String,
    default: ""
},

funParents: {
    type: String,
    default: ""
},

registerParents: {
    type: String,
    default: ""
},


// KANALLAR
chatChannel: {
    type: String,
    default: ""
},

kurallar: {
    type: String,
    default: ""
},



//SİSTEM LOG KANALLAR

cezapuanlog: {
    type: String,
    default: ""
},

transportlog: {
    type: String,
    default: ""
},

jailLogChannel: {
    type: String,
    default: ""
},

banLogChannel: {
    type: String,
    default: ""
},

warnLogChannel: {
    type: String,
    default: ""
},

reklamLogChannel: {
    type: String,
    default: ""
},

cmuteLogChannel: {
    type: String,
    default: ""
},

vmuteLogChannel: {
    type: String,
    default: ""
},


// REGİSTER KANAL
invLogChannel: {
    type: String,
    default: ""
},

teyitKanali: {
    type: String,
    default: ""
},


// LOG KANALLAR
ekipLogChannel: {
    type: String,
    default: ""
},


yetkiLog: {
    type: String,
    default: ""
},

marketLog: {
    type: String,
    default: ""
},



//

toplantiSesChannel: {
    type: String,
    default: ""
},

mazaretliLogChannel: {
    type: String,
    default: ""
},


})


module.exports = mongoose.model("kurulum", serverSettings);
