// File: src/bot/bot.js (JavaScript)

// Import necessary dependencies
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize Discord bot client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Load event listeners
const messageListener = require('./events/message');
const readyListener = require('./events/ready');

// Set up event listeners
client.on('messageCreate', messageListener);
client.once('ready', readyListener);

// Log in to Discord with bot token
client.login(process.env.DISCORD_BOT_TOKEN);

// Export the client for use in other files
module.exports = client;