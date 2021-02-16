const { DatabaseManager,Database } = require("@aloshai/mongosha");
const { MessageEmbed } = require("discord.js");
const registerdb = DatabaseManager.getDatabase("KAYIT");
const config = require("../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

    
if(!message.member.roles.cache.has(config.mod.reg)) return message.channel.send("Bu komutu kullanabilmek için yeterli yetkin yok.")

let harry = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!harry) return message.reply("Bir kullanıcı girmeyi unuttun.");

let name = args[1];
let age = args[2];
if(!name) return message.channel.forcex("Kullanıcın ismini girmelisin..",message.channel.id);
if(message.author.id === harry.id) return;
    if(harry.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Bu kullanıcıyı kayıt edemissin çünkü aynı roldesiniz veya o senden yüksek rolde.")

if(isNaN(age)) return message.channel.forcex("Yaş girmeyi unuttun!",message.channel.id)




    await registerdb.add(`reg.${harry.id}.erkek`,1);
    await registerdb.add(`stat.${message.author.id}.erkek`,1);
    let tarih = Date.now();
    await registerdb.push(`register.${harry.id}`,{
        rol: `<@&${config.roles.erkek}>`,
        user: harry.id,
        mod: message.author.id,
        duration: tarih,
        name: name,
        age: age
    });

    harry.roles.cache.has(config.roles.booster) ? harry.roles.set(config.roles.booster.concat(config.roles.erkek)) : harry.roles.set(config.roles.erkek)

    harry.setNickname(`${config.sembol.tag ? config.sembol.tag : ""} ${name} ${age}`)

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
        .setDescription(`
        ${harry} adlı üye \`Erkek\` olarak kaydedildi
        
        kullanıcın eski isimlerine bakmak için \`${config.prefix}isimler @Forcex/İd\` ile bakabilirsin.
        `)
        .setTimestamp()
    message.channel.send(embed)




};

exports.configuration = {
  CommandName: ["e","erkek"],
  description: "erkek olarak kayıt eder.",
  usage: "e @Member <isim> <yaş>"
};
