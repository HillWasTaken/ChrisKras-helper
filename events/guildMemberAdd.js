const { EmbedBuilder } = require("@discordjs/builders");
const { Embed } = require("discord.js");
const con = require("../functions/con");
require("dotenv").config();
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        
        con.con.query("SELECT ServerID, Channel, MemberRol FROM Bot WHERE ServerID = ?;",
            [member.guild.id],
            function (error, results, field) {
                if (error) throw error;

                const embed = new EmbedBuilder()
                    .setColor(0xB300FA)
                    .setTitle(`Hey! Welkom bij de officiële discord server van ${member.guild.name}!`)
                    .setDescription(`${member.user} Zorg er voor dat je de regels goed leest voordat je verder gaat om consequenties te voorkomen! \n En namens het hele ${member.guild.name} team wenzen wij jullie heel veel plezier!`)
                    .setThumbnail('https://cdn.discordapp.com/attachments/944504162278866975/1049688725002661919/Logo-2.png')
                    .setTimestamp(); 

                const logEmbed = new EmbedBuilder()
                    .setColor(0xC65C0F)
                    .setTitle(`Server logs (Welcome)`)
                    .setDescription(`${member.user} is de server gejoined.`)
                    

                const channel = member.guild.channels.cache.get(results[0].Channel);
                channel.send({ embeds: [embed] });
                member.roles.set([results[0].MemberRol]);
                console.log("sended Welcome embed!");
            })
    }
}