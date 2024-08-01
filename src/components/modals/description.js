const mongoose = require("mongoose");
module.exports = {
  data: {
    name: `description`,
  },
  async execute(interaction, client) {
    //const user = interaction.options.getUser("user");
    //console.log(user);
    const description = interaction.fields.getTextInputValue("descriptionInput");
    await interaction.reply({
      content: `Your new description has been attached to the database, and reads as follows:\n${description}`,
    });
  },
};
