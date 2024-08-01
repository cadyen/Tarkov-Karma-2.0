const User = require(`../../schemas/user`);
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require(`mongoose`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetstats")
    .setDescription("Reset a user's stats.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user to have the stats wiped from.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    let userProfile = await User.findOne({ _id: user?.id });
    if (!userProfile) {
      await interaction.reply({
        content: `There is no database record of ${user.tag} to wipe.`,
      });
    } else {
      await userProfile.updateOne({
        userTeamKills: 0,
        userTeamDeaths: 0,
      });
      await userProfile.save().catch(console.error);
      await interaction.reply({
        content: `${user.username} has had their stats wiped from the database.`
      })
      console.log(`${user.username} has had their stats wiped from the database.`)
    }
  },
};
