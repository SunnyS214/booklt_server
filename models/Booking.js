const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience', 
    required: true,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot', 
    required: true,
  },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  numTickets: { type: Number, required: true, min: 1 },
  promoCodeUsed: { type: String, default: null }, 
  finalPrice: { type: Number, required: true },
  bookingStatus: {
    type: String,
 
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Confirmed',
  },
  bookedAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
