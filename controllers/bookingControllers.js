const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

const validatePromoCode = async (req, res) => {
  const { code, currentPrice } = req.body;
  console.log("Promo Validation Request:", req.body);

  const validCodes = {
    SAVE10: { type: "PERCENT", value: 0.1 },
    FLAT100: { type: "FLAT", value: 100 },
    BOOKLT20: { type: "PERCENT", value: 0.2 },
    MYBOOK200: { type: "FLAT", value: 200 },
  };

  const promo = validCodes[code?.toUpperCase()];

  if (promo) {
    let discount = 0;

    if (promo.type === "PERCENT") {
      discount = currentPrice * promo.value;
    } else if (promo.type === "FLAT") {
      discount = promo.value;
    }

    const newPrice = Math.max(0, currentPrice - discount);

    console.log("Promo Applied:", {
      code,
      type: promo.type,
      discount,
      finalPrice: newPrice,
    });

    return res.json({
      valid: true,
      discount,
      finalPrice: newPrice,
      message: `Promo code ${code.toUpperCase()} applied successfully!`,
    });
  } else {
    console.log("❌ Invalid Promo Code:", code);
    return res.status(400).json({
      valid: false,
      message: "❌ Invalid promo code or code has expired.",
    });
  }
};

const createBooking = async (req, res) => {
  console.log("Booking Request Body:", req.body);

  const {
    experienceId,
    slot,
    user,
    totalPrice,
    promoCode,
    numTickets = 1,
  } = req.body;

  const userName =
    user?.name && user.name.trim() !== "" ? user.name.trim() : "user1";

  if (!user) {
    console.log("Missing user object in request body");
    return res.status(400).json({ message: "Missing user details." });
  }

  if (!slot || !experienceId || !totalPrice || !user.email) {
    console.log(" Invalid booking data:", req.body);
    return res.status(400).json({ message: " Missing required booking details." });
  }

  try {
    const slotData = await Slot.findById(slot);
    if (!slotData) {
      console.log(" Slot not found:", slot);
      return res.status(404).json({ message: "❌ Slot not found." });
    }

    if (slotData.date < new Date(new Date().setHours(0, 0, 0, 0))) {
      console.log(" Slot is in the past:", slotData.date);
      return res.status(400).json({ message: " Cannot book past dates." });
    }

    if (slotData.bookedSeats + numTickets > slotData.totalSeats) {
      console.log("Not enough seats available.");
      return res.status(400).json({ message: " Not enough seats available." });
    }

    const updatedSlot = await Slot.findByIdAndUpdate(
      slot,
      { $inc: { bookedSeats: numTickets } },
      { new: true }
    );

    if (updatedSlot.bookedSeats === updatedSlot.totalSeats) {
      await Slot.updateOne({ _id: slot }, { $set: { status: "Sold Out" } });
    }

    const newBooking = new Booking({
      experience: experienceId,
      slot,
      userName,
      userEmail: user.email,
      userPhone: user.phone || "",
      numTickets,
      promoCodeUsed: promoCode || null,
      finalPrice: totalPrice,
    });

    const savedBooking = await newBooking.save();
    console.log(" Booking Saved:", savedBooking._id);

    return res.status(201).json({
      success: true,
      message: "Booking successful!",
      bookingId: savedBooking._id,
      confirmationNumber: savedBooking._id.toString().slice(-6).toUpperCase(),
      userName,
    });
  } catch (error) {
    console.error(" Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: " Booking failed due to server error.",
      error: error.message,
    });
  }
};

module.exports = {
  validatePromoCode,
  createBooking,
};
