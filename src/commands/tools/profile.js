const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require(`mongoose`);
const User = require(`../../schemas/user`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription(
      "Updated command to return profiles based on user selected."
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user's profile that you wish to view.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    let userProfile = await User.findOne({ _id: user?.id });
    if (!userProfile) {
      await interaction.reply({
        content: `There is currently no database record of ${user.tag}, however you may add one using the /adduser command, then fill in the user's information with /adduserparameters, and finally give a description with /editdescription`,
      });
    } else {

      const tarkovName = userProfile.userTarkovName;
      const firstName = userProfile.userFirstName;
      const description = userProfile.userDescription;
      const colour = userProfile.userColour;
      const avatar = userProfile.userAvatar;
      const favWeapon = userProfile.userFavGun;
      const favLocation = userProfile.userFavLocale;
      const tarkovLevel = String(userProfile.userTarkovLevel);
      const teamKills = String(userProfile.userTeamKills);
      const teamDeaths = String(userProfile.userTeamDeaths);

      const embed = new EmbedBuilder()
        .setTitle(tarkovName)
        .setDescription(description)
        .setColor(colour)
        //.setImage(client.user.displayAvatarURL())
        .setThumbnail(avatar)

        .setAuthor({
          name: (`${user.username} | ${firstName}`),
        })

        .addFields([
          {
            name: `Favourite Weapon`,
            value: favWeapon,
            inline: true,
          },
          {
            name: `Favourite Location`,
            value: favLocation,
            inline: true,
          },
          {
            name: `Tarkov Level`,
            value: tarkovLevel,
            inline: false,
          },
          {
            name: `Team Kills`,
            value: teamKills,
            inline: true,
          },
          {
            name: `Team Deaths`,
            value: teamDeaths,
            inline: true,
          },
        ]);

      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
