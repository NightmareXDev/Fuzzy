const { Client, Collection } = require("discord.js");
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

const client = new Client({
    intents: 32767,
});

module.exports = client;


client.commands = new Collection();
client.config = require("./config.json");

require("./handlers")(client);

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const commands = [];

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    client.user.setPresence({ activities: [{ name: "Stardrew Valley" }] });
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(client.config['bot'].token);

  

    (async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(client.config['bot'].id, client.config['production_server']),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
});


client.login(client.config['bot'].token);