const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please include your username"],
      unique: true,
    },
    city: {
      type: String,
      required: [true, "Please include your city"],
      unique: true,
    },
    date: {
      type: String,
      required: [true, "Please include the date "],
    },
    time: {
      type: String,
      required: [true, "Please specify the scheduled tim for your booking"],
    },
    email: {
      type: String,
      required: [true, "Please include your email"],
    },
    phone: {
      type: String,
      required: false,
    },
    photographer_name: {
      type: String,
      required: [true, "Please include the photographer's name"],
    },
  },
  { timestamps: true }
); //gives the created an dupdated at times //

module.exports = mongoose.model("Booking", BookingSchema);