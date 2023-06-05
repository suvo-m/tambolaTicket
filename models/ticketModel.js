const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  tickets: [
    {
      type: [[Number]],
      required: true,
    },
  ],
 
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

exports.ticketModel = mongoose.model("Ticket", ticketSchema);
