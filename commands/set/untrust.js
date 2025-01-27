const { Message, Client } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "untrust",
  aliases: ['ut', 'uwl', 'unwhitelist'],
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      message.channel.send({ content: `only the owner can untrust users in this server.` });
    } else {
      const user = message.mentions.users.first();
      const ID = user.id;
      const Guild = message.guildId;

      let whitelisted = await db.get(`trust${Guild} ${ID}`)
      if (whitelisted === null) whitelisted = false;
      
      if (whitelisted === false) {
        message.channel.send({ content: `they weren't in the trusted list..` });
      } else {
        await db.delete(`trust${Guild} ${ID}`)
        await message.channel.send({ content: `**${user.username}** was removed from the trusted admins' list.` })
      }
    }
  },
}