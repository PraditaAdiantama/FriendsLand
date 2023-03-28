import dotenv from 'dotenv';
dotenv.config();

import { REST, Routes } from 'discord.js';

const commands = [
    {
        name: 'ping',
        description: 'Reply message with pong'
    }
];

const rest = new REST({ version: '10' })
    .setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash command');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('Successfully registered command');
    } catch (error) {
        console.log(error);
    }
})();
