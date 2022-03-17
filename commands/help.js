const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help command'),
	async execute(interaction) {
		await interaction.channel.send("Hey there :wave:, as Fuzzy is still in its development stage, we are still working on this command.");
	
	},
};
