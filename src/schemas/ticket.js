const { Schema, model, mongoose } = require("mongoose");

const ticketSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ticketTime: Date,
  ticketVictim: {
    type:mongoose.Types.Decimal128
  },
  ticketKiller: {
    type:mongoose.Types.Decimal128
  },
  ticketLocation: String,
  ticketDescription: String,
});

module.exports = model("Ticket", ticketSchema, "tickets");