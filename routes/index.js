const express = require("express");
const experienceController = require("../controllers/experienceController");
const bookingController = require("../controllers/bookingControllers");
const { check } = require("express-validator"); // For validation

const router = express.Router();

// Route to get all experiences
router.get('/experiences', experienceController.getExperiences); 

// Route to get experience details by id with input validation
router.get('/experiences/:id', 
  [
    // Validate if the ID is a valid MongoDB ObjectId
    check('id').isMongoId().withMessage('Invalid experience ID format.')
  ], 
  experienceController.getExperienceDetails
);

// Route to validate promo code
router.post('/promo/validate', 
  [
    // Validate incoming promo code and current price
    check('code').isString().trim().notEmpty().withMessage('Promo code is required.'),
    check('currentPrice').isNumeric().withMessage('Current price must be a number.')
  ], 
  bookingController.validatePromoCode
); 

// Route to create a booking with validation
router.post('/bookings', 
  [
    // Validate the necessary fields for booking creation
    check('slotId').isMongoId().withMessage('Invalid slot ID format.'),
    check('userName').isString().trim().notEmpty().withMessage('User name is required.'),
    check('userEmail').isEmail().withMessage('Invalid email address.'),
    check('numTickets').isInt({ min: 1 }).withMessage('Number of tickets must be greater than zero.'),
    check('finalPrice').isNumeric().withMessage('Final price must be a valid number.')
  ], 
  bookingController.createBooking
); 

module.exports = router;
