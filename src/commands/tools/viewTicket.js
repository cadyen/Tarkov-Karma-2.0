const Ticket = require(`../../schemas/ticket`);
const User = require(`../../schemas/user`);
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require(`mongoose`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("viewticket")
    .setDescription("View a ticket from the database.")
    .addStringOption((option) =>
      option
        .setName("ticket")
        .setDescription("Input the ticket to view.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const ticket = interaction.options.getString("ticket");
    let selectedTicket = await Ticket.findOne({ _id: ticket });
    if (!selectedTicket) {
      await interaction.reply({
        content: `${ticket} is not a valid ticket in the database!`,
      });
    } else {
      const killerProfile = await User.findOne({
        _id: selectedTicket.ticketKiller,
      });
      const victimProfile = await User.findOne({
        _id: selectedTicket.ticketVictim,
      });

      const embed = new EmbedBuilder()
        .setTitle(`Viewing incident on ${selectedTicket.ticketLocation}`)
        .setDescription(selectedTicket.ticketDescription)
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
            value: selectedTicket.ticketLocation,
            inline: true,
          },
          {
            name: "Ticket ID",
            value: String(selectedTicket._id),
            inline: false,
          },
        ]);

      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
