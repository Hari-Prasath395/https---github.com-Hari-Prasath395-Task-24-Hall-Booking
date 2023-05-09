const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
  });

  const Booking = mongoose.model('Booking', bookingSchema);

  module.exports = Booking;