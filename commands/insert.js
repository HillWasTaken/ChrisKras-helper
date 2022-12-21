const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const con = require("../functions/con");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("insert")
        .setDescription("zet alle nodige informatie in het database")
        .addChannelOption(option => 
            option.setName('welkomskanaal')
                .setDescription('Het welkoms kanaal voor het welkoms bericht')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName("modrole")
                .setDescription("Mod rollen")
                .setRequired(true))
        .addRoleOption(option => 
            option.setName("memberrol")
                .setDescription("De member rol")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {

        const GUILD_ID = interaction.guildId;
        const welcomeChannel = interaction.options.getChannel('welkomskanaal'); //welcomeChannel.id
        const modRol = interaction.options.getRole('modrole'); //modRol.id
        const memberRol = interaction.options.getRole('memberrol'); //memberRol.id

        con.con.query("SELECT ServerID, Channel, ModRol, MemberRol FROM Bot WHERE ServerID = ?",
        [GUILD_ID],
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            if (results.length < 1) {
                con.con.query('INSERT INTO Bot (ServerID, Channel, ModRol, MemberRol) VALUES (?, ?, ?, ?)',
                [GUILD_ID, welcomeChannel.id, modRol.id, memberRol.id],
                function (error,results, fields) {if (error) throw error;})
                interaction.reply({content: "Information succesfully send to Database."});
            } else if (results.length >= 1) {
                console.log("niet zo lol");
                interaction.reply({content: "Information is already known in the Database."});
            }
        })
        
    }
}