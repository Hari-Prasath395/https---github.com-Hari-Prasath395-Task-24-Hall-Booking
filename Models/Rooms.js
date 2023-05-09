const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seats: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  pricePerHour: { type: Number, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;



