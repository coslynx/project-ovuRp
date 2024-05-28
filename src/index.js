// File: src/index.js

// Import required modules
const express = require('express');
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bot = require('./bot/bot');
const database = require('./database/connection');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

// Initialize Discord bot client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.setup(client);

// Connect to MongoDB database
database.connect();

// Set up Express server
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Moderation Discord Bot is running!');
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Event listeners
client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  bot.handleMessage(message);
});

// Login to Discord bot
client.login(process.env.DISCORD_TOKEN);