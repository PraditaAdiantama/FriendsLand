module.exports = function (oldState, newState, client) {
    const member = client.guilds.cache
        .get('744118069672017930').members.cache
        .filter(member => !member.user.bot).size

    client.channels.cache
        .get('1121942597628338196')
        .setName(`Member: ${member}`)
}