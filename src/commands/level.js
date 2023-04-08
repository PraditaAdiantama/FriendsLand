const { Client, Interaction, SlashCommandBuilder } = require('discord.js')
const Level = require('../models/Level')

module.exports = {
    data: new SlashCommandBuilder().setName('level').setDescription("Menampilkan level"),
    run: async ({ interaction, client }) => {
        if(!interaction.inGuild()){
            interaction.reply('Command hanya bisa di jalankan di server')
            return
        }
        
        await interaction.deferReply()

        const mentionUserId = interaction.options.get('target-user')?.value
        const targetUserId = mentionUserId || interaction.member.id
        const targetUserObj = await interaction.guild.members.fetch(targetUserId)

        const fetchLevel = await Level.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id
        })

        if(!fetchLevel){
            interaction.editReply(
                mentionUserId ? `${targetUserObj.user.tag} Belum memiliki level sama sekali` : "Kamu belum memiliki level "
            )
            return
        }
        let allLevels = await Level.find({guildId: interaction.guild.id}).select('-_id userId level xp')

        allLevels.sort((a,b) => {
            if(a.level === b.level){
                return b.xp - a.xp;
            }else{
                return b.level - a.level;
            }
        })

        let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1
        
    }
}