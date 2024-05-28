// File: src/bot/commands/moderation.js (JavaScript)

const { Client, Message } = require('discord.js');
const { getModerationSettings, updateModerationSettings, logModerationAction } = require('../../services/moderationService');
const { getUserById, updateUserWarnings, kickUser, muteUser } = require('../../services/userService');
const { getTimestamp } = require('../../helpers/moderationHelper');

/**
 * Handle message moderation based on server settings
 * @param {Client} client - The Discord client
 * @param {Message} message - The message to moderate
 */
async function handleModeration(client, message) {
    const guildId = message.guild.id;
    const moderationSettings = await getModerationSettings(guildId);

    // Check if message contains inappropriate content
    if (moderationSettings.inappropriateContent.some(word => message.content.toLowerCase().includes(word))) {
        // Log the moderation action
        await logModerationAction(guildId, message.author.id, 'Inappropriate Content', getTimestamp());
        
        // Update user warnings
        const user = await getUserById(message.author.id, guildId);
        const updatedWarnings = user.warnings + 1;
        await updateUserWarnings(message.author.id, guildId, updatedWarnings);

        // Check if user exceeds warning threshold
        if (updatedWarnings >= moderationSettings.warningThreshold) {
            // Perform appropriate action (kick or mute)
            if (moderationSettings.kickEnabled) {
                await kickUser(message.author, 'Exceeded Warning Threshold');
            } else {
                await muteUser(message.member, moderationSettings.muteDuration, 'Exceeded Warning Threshold');
            }
        }

        // Delete the inappropriate message
        await message.delete();
    }
}

module.exports = {
    handleModeration
};