const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  busName: String,
  from: String,
  to: String,
  departure: String,
  arrival: String,
  journeyDate: {
    type: String,
    required: true
  },
  seats: [String],
  passengers: [
    {
      name: String,
      gender: String,
      age: Number
    }
  ],
  totalPrice: Number,
  status: {
    type: String,
    enum: ["Booked", "Cancelled"],
    default: "Booked"
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
