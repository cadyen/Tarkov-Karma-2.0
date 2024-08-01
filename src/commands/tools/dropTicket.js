const Ticket = require(`../../schemas/ticket`);
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require(`mongoose`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dropticket")
    .setDescription("Removes a ticket from the database.")
    .addStringOption((option) =>
      option
        .setName("ticket")
        .setDescription("Input the ticket to remove.")
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
      selectedTicket.remove();
      await interaction.reply({
        content: `The ticket with ID:${ticket} has been removed from the database!`,
      });
      console.log(`${interaction.user.username} has removed the ticket with ID:${ticket} from the database.`);
    }
  },
};
