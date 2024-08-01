const { SlashCommandBuilder } = require("discord.js");
const { mongoose } = require("mongoose");
const User = require(`../../schemas/user`);
const Ticket = require(`../../schemas/ticket`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("findticket")
    .setDescription("Query for an existing ticket!")
    .addUserOption((option) =>
      option
        .setName("killer")
        .setDescription("Who was the killer in the incident?")
        .setRequired(false)
    )
    .addUserOption((option) =>
      option
        .setName("victim")
        .setDescription("Who was the victim in the incident?")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription("Where did this take place?")
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
    ),

  async execute(interaction, client) {
    const victim = interaction.options.getUser("victim");
    const killer = interaction.options.getUser("killer");
    const location = interaction.options.getString("location");
    
    const queryKiller = await Ticket.find({ ticketKiller: killer.id }).select('ticketLocation ticketDescription');
    //const queryVictim = await Ticket.find({ ticketVictim: victim.id });
    //const queryLocation = await Ticket.find({ ticketLocation: location });
    console.log(queryKiller._id);
    await interaction.reply({
      content: `${'```'}${String(queryKiller)} test${'```'}`
    })
    //console.log(queryVictim);
    //console.log(queryLocation);
    //console.log(query._id);

    //console.log(query);
    //console.log(killer.id);
  },
};
