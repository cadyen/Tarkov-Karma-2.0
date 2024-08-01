const User = require(`../../schemas/user`);
const { SlashCommandBuilder, CommandInteractionOptionResolver } = require("discord.js");
const mongoose = require(`mongoose`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adduser")
    .setDescription("Adds a user to the database.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user to add.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    let userProfile = await User.findOne({ _id: user?.id });
    if (!userProfile) {
      userProfile = new User({
        _id: user.id,
        userName: user.tag,
        userAvatar: user.avatarURL(),
        userFirstName: 'Unknown',
        userTarkovName: 'Unknown',
        userTarkovLevel: 0,
        userTeamKills: 0,
        userTeamDeaths: 0,
        userColour: 0,
        userFavLocale: 'Unknown',
        userFavGun: 'Unknown',
        userDescription: 'Unknown',
      });

      await userProfile.save().catch(console.error);
      await interaction.reply({
        content: `Added ${user.tag} to the database!`,
      });
      console.log(userProfile);
    } else {
      await interaction.reply({
        content: `${user.tag} is already in the database!`,
      });
    }
  },
};
