const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  _id: {
    type:mongoose.Types.Decimal128
  },
  userName: String,
  userAvatar: String,
  userFirstName: { type: String, required: false },
  userTarkovName: { type: String, required: false },
  userTarkovLevel: { type: Number, required: false },
  userTeamKills: { type: Number, required: false },
  userTeamDeaths: { type: Number, required: false },
  userColour: { type: String, required: false },
  userFavLocale: { type: String, required: false },
  userFavGun: { type: String, required: false },
  userDescription: { type: String, required: false},
});

module.exports = model("User", userSchema, "users");