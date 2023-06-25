const { Client, Message } = require('discord.js')
const Level = require('../../models/Level')
const calculateLevelXp = require('../../utils/calculateLevelXp')
const dotenv = require('dotenv').config();

function getRandomXp(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (message, client) => {
    if(!message.inGuild() || message.author.bot) return

    const xpToGive = getRandomXp(5, 10)

    const query = {
        userId: message.author.id,
        guildId: message.guild.id
    }

    try {
        const level = await Level.findOne(query)

        if(level){
            level.xp += xpToGive;

            if(level.xp > calculateLevelXp(level.level)){
                level.xp = 0
                level.level += 1

                client.channels.cache.get(process.env.LEVEL_CHANNEL_ID).send(`${message.member} you has level up to **${level.level}** level`)
            }

            await level.save().catch((e) => {
                console.log(e);
                return
            })
        }

        // if(!level)
        else{
            const newLevel = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive
            })
        }
    } catch (error) {
        console.log(error);
    }
}