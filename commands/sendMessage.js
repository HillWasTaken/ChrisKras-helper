const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send a message in a channel")
        .addStringOption(option =>
            option.setName('title')
                .setDescription('De titel voor het embed.')
                .setRequired(true)) 
        .addStringOption(option => 
            option.setName('description')
                .setDescription('De description voor het embed.')
                .setRequired(true))
        .addBooleanOption(option => 
            option.setName('embed')
                  .setDescription('Word het een embed?')
                  .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        // await interaction.reply("sending...");
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const ifEmbed = interaction.options.getBoolean('embed');

        if (ifEmbed == true) {
            const embed = new EmbedBuilder()
                .setColor(0xB300FA)
                .setTitle(title)
                .setDescription(description)
                .setTimestamp();
            const channel = interaction.guild.channels.cache.get(interaction.channelId);
            channel.send({ embeds: [embed] });
        } else {
            const message = title + "\n" + description;
            const channel = interaction.guild.channels.cache.get(interaction.channelId);
            channel.send(message);
        }
        console.log(ifEmbed);
        // console.log(interaction);
        // const channelID = interaction.options.getChannel('channel');
        // const channelSend = client.channels.cache.get(channelID.id);
        // channelSend.send("hij doet het hoor");
        // console.log(channelID.id);
    },
};