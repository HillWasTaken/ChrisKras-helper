require('dotenv').config();
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require('@discordjs/rest');
const con = require('./functions/con');

const commands = []

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

con.con.query("SELECT ServerID FROM Bot",
    async function (error, results, fields) {
        for (x = 0; x < results.length; x++) {
            console.log(results[x].ServerID);

            await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, results[x].ServerID), { body: commands })
                .then(() => console.log('Succesfully registered application commands.'))
                .catch(console.error);
        }
        process.exit();

    })
