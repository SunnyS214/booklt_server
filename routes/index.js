const express = require("express");
const experienceController = require("../controllers/experienceController");
const bookingController = require("../controllers/bookingControllers");
const { check } = require("express-validator"); // For validation

const router = express.Router();

router.get('/experiences', experienceController.getExperiences); 

router.get('/experiences/:id', 
  [
    check('id').isMongoId().withMessage('Invalid experience ID format.')
  ], 
  experienceController.getExperienceDetails
);

router.post('/promo/validate', 
  [
    check('code').isString().trim().notEmpty().withMessage('Promo code is required.'),
    check('currentPrice').isNumeric().withMessage('Current price must be a number.')
  ], 
  bookingController.validatePromoCode
); 

router.post('/bookings', 
  [
    check('slotId').isMongoId().withMessage('Invalid slot ID format.'),
    check('userName').isString().trim().notEmpty().withMessage('User name is required.'),
    check('userEmail').isEmail().withMessage('Invalid email address.'),
    check('numTickets').isInt({ min: 1 }).withMessage('Number of tickets must be greater than zero.'),
    check('finalPrice').isNumeric().withMessage('Final price must be a valid number.')
  ], 
  bookingController.createBooking
); 

module.exports = router;
