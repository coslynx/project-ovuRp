// File: src/bot/commands/user.js (JavaScript)

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Add your custom moderation logic here
});

client.login(process.env.DISCORD_BOT_TOKEN);