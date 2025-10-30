const express = require("express");
const experienceController = require("../controllers/experienceController")
const bookingController = require("../controllers/bookingControllers")

const router = express.Router();

router.get('/experiences', experienceController.getExperiences); 
router.get('/experiences/:id', experienceController.getExperienceDetails); 

router.post('/promo/validate', bookingController.validatePromoCode); 
router.post('/bookings', bookingController.createBooking); 

module.exports = router;
