const { CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("twitch")
        .setDescription('Geeft je de informatie van een twitch streamer.')
        .addStringOption(option => 
            option.setName("streamer")
                .setDescription('De streamer waar je de informatie van wilt.')
                .setRequired(true)),
        /**
         * 
         * @param {CommandInteraction} interaction
         */
        async execute (interaction) {
            const { options, member } = interaction;
            const channelName = options.getString('streamer');

            interaction.deferReply();

            try {
                const Response = await superagent.get (
                    `https://api.crunchprank.net/twitch/followcount/${channelName.toLowerCase()}`
                );

                const upTime = await superagent.get (
                    `https://api.crunchprank.net/twitch/uptime/${channelName.toLowerCase()}`
                );

                const totalViews = await superagent.get (
                    `https://api.crunchprank.net/twitch/total_views/${channelName.toLowerCase()}`
                );

                const lastGame = await superagent.get (
                    `https://api.crunchprank.net/twitch/game/${channelName.toLowerCase()}`
                );

                const age = await superagent.get (
                    `https://api.crunchprank.net/twitch/creation/${channelName.toLowerCase()}`
                );

                const avatar = await superagent.get (
                    `https://api.crunchprank.net/twitch/avatar/${channelName.toLowerCase()}`
                );

                const embed = new EmbedBuilder()
                    .setTitle(`Twitch Stats van ${channelName}`)
                    .setColor(0xB300FA)
                    .setFields(
                        {
                            name: "Volgers:",
                            value: `${Response.text}`,
                        },
                        {
                            name: "Views:",
                            value: `${totalViews.text}`,
                        },
                        {
                            name: "Uptime:",
                            value: `${upTime.text}`,
                        },
                        {
                            name: "Account aangemaakt op:",
                            value: `${age.text}`,
                        },{
                            name: "Laatste stream:",
                            value: `${lastGame.text}`,
                        },
                        {
                            name: "Live:",
                            value: `${upTime.text}`,
                        },
                    )
                    .setFooter({
                        text: `Informatie aangevraagt door ${member.user.tag}`,
                        iconURL: member.user.displayAvatarURL(),
                    })
                    .setURL(`https://twitch.tv/${channelName}`)
                    .setThumbnail(`https://pngimg.com/uploads.twitch/twitch_PNG27.png`)
                    .setImage(`${avatar.text}`)
                    .setTimestamp();

                console.log(upTime);
                
                interaction.editReply({
                    embeds: [embed]
                }).catch(err => {
                    // console.log(err)
                    interaction.editReply({
                        content: `Streamer ${channelName} bestaat niet.`,
                        ephemeral: true
                    })
                })

            } catch (error) {
                console.error(error)
                //return interaction.reply({content: "Er is een error gevonden. Contacteer de developer: HILL#6309."})
            }
        }
}