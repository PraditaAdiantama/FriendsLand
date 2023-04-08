module.exports = (interaction,commandObj) => {
    if(commandObj.devOnly){
        if(interaction.member.id !== '793991682310799360'){
            interaction.reply('Your not admin')
            return true;
        }
    }
}