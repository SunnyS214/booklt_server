const Booking = require('../models/Booking');
const Slot = require('../models/Slot');


const validatePromoCode = async (req, res) => {
  const { code, currentPrice } = req.body;

  const validCodes = {
    SAVE10: { type: 'PERCENT', value: 0.10 }, 
    FLAT100: { type: 'FLAT', value: 100 },  
    BOOKLT20: { type: 'PERCENT', value: 0.20 }, 
  };

  const promo = validCodes[code.toUpperCase()];

  if (promo) {
    let discount = 0;
    if (promo.type === 'PERCENT') {
      discount = currentPrice * promo.value;
    } else if (promo.type === 'FLAT') {
      discount = promo.value;
    }
    
    const newPrice = Math.max(0, currentPrice - discount); 
    
    res.json({ valid: true, discount, finalPrice: newPrice, message: `Promo code ${code.toUpperCase()} applied successfully!` });
  } else {
    res.status(400).json({ valid: false, message: 'Invalid promo code or code has expired.' }); 
  }
};


const createBooking = async (req, res) => {
  const { slotId, userName, userEmail, numTickets, promoCode, finalPrice } = req.body;

  if (!slotId || !userName || !userEmail || !numTickets || numTickets < 1 || !finalPrice) {
    return res.status(400).json({ message: 'Missing required booking details or number of tickets is invalid.' });
  }

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: 'Selected slot not found.' });
    }
    
    if (slot.date < new Date(new Date().setHours(0, 0, 0, 0))) {
        return res.status(400).json({ message: 'This slot is in the past and cannot be booked.' });
    }

    if (slot.bookedSeats + numTickets > slot.totalSeats) {
      return res.status(400).json({ message: 'Not enough seats available for this slot. Please try a different time.' });
    }
    

    const updatedSlot = await Slot.findByIdAndUpdate(
        slotId, 
        { $inc: { bookedSeats: numTickets } }, 
        { new: true } 
    );


    if (updatedSlot.bookedSeats === updatedSlot.totalSeats) {
        await Slot.updateOne({ _id: slotId }, { $set: { status: 'Sold Out' } });
    }

    const newBooking = new Booking({
      experience: slot.experience,
      slot: slotId,
      userName,
      userEmail,
      numTickets,
      promoCodeUsed: promoCode || null,
      finalPrice, 
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
        message: 'Booking successful! Confirmation email sent.',
        bookingId: savedBooking._id,
        confirmationNumber: savedBooking._id.toString().slice(-6).toUpperCase() 
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Booking failed due to a server error. Please try again.' });
  }
};

module.exports = {
  validatePromoCode,
  createBooking,
};
