const { SlashCommandBuilder } = require("discord.js");
const mongoose = require(`mongoose`);
const User = require(`../../schemas/user`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("editdescription")
    .setDescription(
      "Edits current description of selected user. Make sure to keep a backup of the old one just in case."
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user to add.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Edit the selected user's description.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    let userProfile = await User.findOne({ _id: user?.id });
    if (!userProfile) {
      await interaction.reply({
        content: `There is currently no database record of ${user.tag}, however you may add one using the /adduser command.`,
      });
    } else {
      const description = interaction.options.getString("description");
      await userProfile.updateOne({
        userDescription: description,
      });
      console.log(
        `The userDescription for ${user.tag} has been changed to ${description}`
      );
      await interaction.reply({
        content: `The description for ${user.tag} has been updated to now read:\n${description}`,
      });
    }
  },
};
