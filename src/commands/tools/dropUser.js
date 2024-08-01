const User = require(`../../schemas/user`);
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require(`mongoose`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dropuser")
    .setDescription("Removes a user from the database.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user to remove.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    let userProfile = await User.findOne({ _id: user?.id });
    if (!userProfile) {
      await interaction.reply({
        content: `${user.tag} is not in the database!`,
      });
    } else {
      userProfile.remove();
      await interaction.reply({
        content: `${user.tag} has been removed from the database!`,
      });
      console.log(`${interaction.user.username} has removed ${user.tag} from the database.`);
    }
  },
};
