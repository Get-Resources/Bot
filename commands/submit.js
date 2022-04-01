const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, InteractionCollector, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit')
        .setDescription('Learn how to submit/remove a resource'),
    async execute(interaction) {

        const Embed = new MessageEmbed()
        .setColor('BLACK')
        .setTitle(`Submit a new resource`)
        .setDescription(`To **submit** a new resource on our site please follow the steps as shown [here](https://github.com/Get-Resources/Resources/blob/main/README.md)\n\nTo **remove** or **report** a resource please contact us at dan@dfxsystems.net`)

        await interaction.reply({ embeds: [Embed] })
    },
};