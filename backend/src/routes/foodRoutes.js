const express = require('express');
const Food = require('../models/Food');
const { sampleFoods } = require('../data/sampleFoods');

const router = express.Router();

// GET /api/foods?category=Pizza&search=cheese&veg=true
router.get('/', async (req, res) => {
  try {
    const { category, search, veg } = req.query;
    let foods;

    if (req.app.locals.dbConnected) {
      const filter = {};
      if (category && category !== 'All') filter.category = category;
      if (veg === 'true') filter.isVeg = true;
      if (search) filter.name = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
      foods = await Food.find(filter).sort({ category: 1, name: 1 });
    } else {
      foods = sampleFoods.filter(
        (f) =>
          (!category || category === 'All' || f.category === category) &&
          (veg !== 'true' || f.isVeg) &&
          (!search || f.name.toLowerCase().includes(search.toLowerCase()))
      );
    }

    res.json({ success: true, count: foods.length, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Menu load nahi ho paya.' });
  }
});

module.exports = router;
