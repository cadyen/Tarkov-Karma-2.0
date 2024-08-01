const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: mongoose, now } = require("mongoose");
const Ticket = require(`../../schemas/ticket`);
const User = require(`../../schemas/user`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newincident")
    .setDescription("Create a new teamkill incident.")
    .addUserOption((option) =>
      option
        .setName("killer")
        .setDescription("Who killed the victim?")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("victim")
        .setDescription("Who was killed in the incident?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription("Where did this take place?")
        .setRequired(true)
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
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Give a brief description of the incident.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const ticketId = mongoose.Types.ObjectId();
    const victim = interaction.options.getUser("victim");
    const killer = interaction.options.getUser("killer");
    const location = interaction.options.getString("location");
    const description = interaction.options.getString("description");

    let victimProfile = await User.findOne({ _id: victim?.id });

    let killerProfile = await User.findOne({ _id: killer?.id });

    if (!victimProfile || !killer) {
      await interaction.reply(
        "One of, or both of the selected users are not on the database. Please register them with /adduser and try again."
      );
    } else {
      const victimTeamDeaths = victimProfile.userTeamDeaths;

      await victimProfile.updateOne({
        userTeamDeaths: victimTeamDeaths + 1,
      });

      const killerTeamKills = killerProfile.userTeamKills;

      await killerProfile.updateOne({
        userTeamKills: killerTeamKills + 1,
      });

      const newTicket = await new Ticket({
        _id: ticketId,
        ticketTime: Date.now(),
        ticketVictim: victimProfile.id,
        ticketKiller: killerProfile.id,
        ticketLocation: location,
        ticketDescription: description,
      });

      await newTicket.save().catch(console.error);

      const embed = new EmbedBuilder()
        .setTitle(`New team kill ticket created!`)
        .setDescription(description)
        .setColor(0xff0000)
        .setTimestamp(Date.now())
        .addFields([
          {
            name: `Killer`,
            value: killerProfile.userTarkovName,
            inline: true,
          },
          {
            name: "Victim",
            value: victimProfile.userTarkovName,
            inline: true,
          },
          {
            name: "Location",
            value: location,
            inline: true,
          },
          {
            name: "Ticket ID",
            value: String(ticketId),
            inline: false,
          },
        ]);

      await interaction.reply({
        embeds: [embed],
      });

      console.log(newTicket);
    }
  },
};
