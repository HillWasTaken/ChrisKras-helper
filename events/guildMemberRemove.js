const con = require("../functions/con");

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    execute(member) {

        con.con.query("SELECT Channel FROM Bot WHERE ServerID = ?;",
        [member.guild.id],
        function (error, results, fields) {
            if (error) { 
                throw error; 
            }
            const channel = member.guild.channels.cache.get(results[0].Channel);
            channel.send(`${member.user} has left the server!`);  
        })
    }
}