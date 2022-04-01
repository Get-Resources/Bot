const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, InteractionCollector, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('links')
        .setDescription('Take a look at our links'),
    async execute(interaction) {

        const Embed = new MessageEmbed()
        .setDescription(`Below are our links!`)
        .setColor('BLACK')
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('🌐 Website')
                    .setURL('https://getresources.info')
					.setStyle('LINK'),
                new MessageButton()
					.setLabel('🖥️ GitHub')
                    .setURL('https://github.com/Get-Resources')
					.setStyle('LINK'),
			);

        await interaction.reply({ embeds: [Embed], components: [row] })
    },
};