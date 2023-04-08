const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('reply with pong'),
    run: ({ interaction }) => {
        interaction.reply('Pong!');
    },
    devOnly: false,
}