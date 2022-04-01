const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, InteractionCollector, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get some info on what GetResources is'),
    async execute(interaction) {

        const Embed = new MessageEmbed()
        .setColor('BLACK')
        .setTitle(`What is GetResources?`)
        .setDescription(`GetResources is the new **open source platform** where you can find tons of **free-to-use resources** to get started on your very own projects.\nAnyone can use the resources on our site, **free of charge**, for whatever they want!\n\n**Visit our links!**\n[Website](https://getresources.info)\n[GitHub](https://github.com/Get-Resources)`)
        .setTimestamp(Date.now())

        await interaction.reply({ embeds: [Embed] })
    },
};