module.exports = (member, client) => {
    client.channels.cache.get('1055999127730786344').setName(`Total : ${member.guild.memberCount}`)
    client.channels.cache.get('1055999129513361418').setName(`Bots : ${member.guild.members.cache.filter(member => member.user.bot).size}`)
}