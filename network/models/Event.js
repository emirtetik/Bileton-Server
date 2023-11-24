const { default: mongoose } = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    startTime: String,
    endTime: String,
    eventDate: String,
    venue: String,
    city: String,
    category: String,
    ticketCount: Number,
    image: String
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", EventSchema);

module.exports = { Event };
