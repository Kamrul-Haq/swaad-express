const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    emoji: { type: String, default: '🍽️' },
    image: { type: String, default: '' }, // optional: photo ka URL
    rating: { type: Number, default: 4.5 },
    prepTime: { type: String, default: '20-25 min' },
    isVeg: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);
