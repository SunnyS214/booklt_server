const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience', 
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  totalSeats: { type: Number, required: true, default: 10 },
  bookedSeats: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Available', 'Sold Out', 'Cancelled'],
    default: 'Available',
  },

  isActive: { type: Boolean, default: true },
});


SlotSchema.index({ experience: 1, date: 1, time: 1 }, { unique: true });

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;