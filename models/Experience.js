const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String }, 
  images: [{ type: String }], 
  location: { type: String, required: true },
 
  category: { type: String, required: true, default: 'Adventure' },
  rating: { type: Number, default: 4.5 },
});

const Experience = mongoose.model('Experience', ExperienceSchema);

module.exports = Experience;
