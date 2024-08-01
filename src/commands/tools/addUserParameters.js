const User = require(`../../schemas/user`);
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require(`mongoose`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adduserparameters")
    .setDescription("Append a user already in the database with parameters..")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the user to add.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tarkovname")
        .setDescription("The player's username in Escape From Tarkov.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("firstname")
        .setDescription("The player's IRL first name.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("favcolour")
        .setDescription("The player's favourite colour.")
        .setRequired(false)
        .addChoices(
          { name: "Red", value: "0xff0000" },
          { name: "Green", value: "0x00ff00" },
          { name: "Blue", value: "0x0000ff" },
          { name: "Yellow", value: "0xffff00" },
          { name: "Orange", value: "0xffa500" },
          { name: "Purple", value: "0xa020f0" },
          { name: "Pink", value: "0xffc0cb" },
          { name: "Brown", value: "0x964b00" },
          { name: "White", value: "0xffffff" },
          { name: "Black", value: "0x000000" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("tarkovlevel")
        .setDescription("The player's level in Escape From Tarkov.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("favweapon")
        .setDescription("The player's favourite weapon in Escape From Tarkov.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("favlocation")
        .setDescription(
          "The player's favourite location in Escape From Tarkov."
        )
        .setRequired(false)
        .addChoices(
          { name: "Customs", value: "Customs" },
          { name: "Factory", value: "Factory" },
          { name: "Interchange", value: "Interchange" },
          { name: "The Lab", value: "The Lab" },
          { name: "Lighthouse", value: "Lighthouse" },
          { name: "Reserve", value: "Reserve" },
          { name: "Shoreline", value: "Shoreline" },
          { name: "Streets of Tarkov", value: "Streets of Tarkov" },
          { name: "Woods", value: "Woods" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("teamkills")
        .setDescription(
          "The amount of times a player has killed their teammate/s in Escape From Tarkov."
        )
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("teamdeaths")
        .setDescription(
          "The amount of times a player had been killed by their teammate/s in Escape From Tarkov."
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    let userProfile = await User.findOne({ _id: user?.id });
    if (!userProfile) {
      await interaction.reply({
        content: `There is currently no database record of ${user.tag}, however you may add one using the /adduser command.`,
      });
    } else {
      const tarkovName = interaction.options.getString("tarkovname");
      const firstName = interaction.options.getString("firstname");
      const favColour = interaction.options.getString("favcolour");
      const tarkovLevel = interaction.options.getInteger("tarkovlevel");
      const favWeapon = interaction.options.getString("favweapon");
      const favLocation = interaction.options.getString("favlocation");
      const teamKills = interaction.options.getInteger("teamkills");
      const teamDeaths = interaction.options.getInteger("teamdeaths");

      if (!tarkovName == false) {
        await userProfile.updateOne({
          userTarkovName: tarkovName,
        });
        console.log(
          `The userTarkovName for ${user.tag} has been changed to ${tarkovName}`
        );
      }
      if (!firstName == false) {
        await userProfile.updateOne({
          userFirstName: firstName,
        });
        console.log(
          `The userFirstName for ${user.tag} has been changed to ${firstName}`
        );
      }
      if (!favColour == false) {
        await userProfile.updateOne({
          userColour: favColour,
        });
        console.log(
          `The userColour for ${user.tag} has been changed to ${favColour}`
        );
      }
      if (!tarkovLevel == false) {
        await userProfile.updateOne({
          userTarkovLevel: tarkovLevel,
        });
        console.log(
          `The userTarkovLevel for ${user.tag} has been changed to ${tarkovLevel}`
        );
      }
      if (!favWeapon == false) {
        await userProfile.updateOne({
          userFavGun: favWeapon,
        });
        console.log(
          `The userFavGun for ${user.tag} has been changed to ${favWeapon}`
        );
      }
      if (!favLocation == false) {
        await userProfile.updateOne({
          userFavLocale: favLocation,
        });
        console.log(
          `The userFavLocale for ${user.tag} has been changed to ${favLocation}`
        );
      }
      if (!teamKills == false) {
        await userProfile.updateOne({
          userTeamKills: teamKills,
        });
        console.log(
          `The userTeamKills for ${user.tag} has been changed to ${teamKills}`
        );
      }
      if (!teamDeaths == false) {
        await userProfile.updateOne({
          userTeamDeaths: teamDeaths,
        });
        console.log(
          `The userTeamDeaths for ${user.tag} has been changed to ${teamDeaths}`
        );
      }

      await userProfile.save().catch(console.error);
      await interaction.reply({
        content: `Added your selected information to the database!`,
      });
    }
  },
};
