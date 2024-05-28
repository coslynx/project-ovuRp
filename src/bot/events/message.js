// File: src/bot/events/message.js

const { Client } = require('discord.js');
const client = new Client();
const axios = require('axios');
const { moderationService } = require('../../services/moderationService');
const { userService } = require('../../services/userService');
const { logger } = require('../../utils/logger');

client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;

    // Automated moderation logic
    await moderationService.autoModerate(message);

    // User reputation system logic
    await userService.updateReputation(message);

  } catch (error) {
    logger.error(`Error in message event: ${error.message}`);
  }
});

module.exports = client;