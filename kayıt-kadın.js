const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['786482430252154920', 'EXTRA ROL KOYABİLİRSİN', 'EĞER KOYMAK İSTEMİYORSAN TIRNAKLARI SİL'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = ""
const kayıtlı = message.guild.roles.cache.find(r => r.id === '786471359617826846')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '786118218174693376')

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor?')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim Belirt.')
if(!yas) return message.reply('Yaş Belirt.')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`kadinUye.${message.author.id}`, 1)
let kadın = db.get(`kadinUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`Verilen Rol:`, `<@&${786471359617826846}> Rolleri Verildi`) 
    .addField(`Alınan Rol:`, `<@&${786118218174693376}> Rolleri Alındı`)
    .addField(`Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(``)
.setColor('GREEN')
client.channels.cache.get('786118281811329034').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kadın','k','woman','girl', 'kız'],
    permLevel: 0
};

exports.help = {
    name: 'kadın',
};