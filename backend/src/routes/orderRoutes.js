const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Food = require('../models/Food');
const { sampleFoods } = require('../data/sampleFoods');

const router = express.Router();
const demoOrders = new Map(); // demo mode mein orders yahan rehte hain

const DELIVERY_FEE = 29;
const FREE_DELIVERY_ABOVE = 499;

// Demo ke liye status time ke hisaab se badalta hai (admin panel ki zaroorat nahi)
function withStatus(order) {
  const o = order.toObject ? order.toObject() : order;
  const minutes = (Date.now() - new Date(o.createdAt).getTime()) / 60000;
  let status = 'Order confirmed';
  if (minutes >= 25) status = 'Delivered';
  else if (minutes >= 10) status = 'Out for delivery';
  else if (minutes >= 2) status = 'Preparing';
  return { ...o, status };
}

// Cart ke items ki asli price database/menu se nikaalte hain
async function findFoods(dbConnected, ids) {
  const found = new Map();
  if (dbConnected) {
    const validIds = ids.filter((id) => mongoose.isValidObjectId(id));
    const foods = await Food.find({ _id: { $in: validIds } });
    foods.forEach((f) => found.set(String(f._id), f));
  }
  sampleFoods.forEach((f) => {
    if (ids.includes(f._id) && !found.has(f._id)) found.set(f._id, f);
  });
  return found;
}

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;

    const name = String(customer?.name || '').trim();
    const phone = String(customer?.phone || '').trim();
    const address = String(customer?.address || '').trim();
    if (name.length < 2 || address.length < 8 || !/^[6-9]\d{9}$/.test(phone))
      return res.status(400).json({ success: false, message: 'Naam, 10 digit mobile number aur poora address daalo.' });
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ success: false, message: 'Cart khaali hai.' });

    const dbConnected = req.app.locals.dbConnected;
    const foods = await findFoods(dbConnected, items.map((i) => String(i.foodId)));

    const orderItems = [];
    for (const item of items) {
      const food = foods.get(String(item.foodId));
      if (!food) return res.status(400).json({ success: false, message: 'Cart mein ek item ab available nahi hai.' });
      const quantity = Math.min(20, Math.max(1, parseInt(item.quantity, 10) || 1));
      orderItems.push({ foodId: String(food._id), name: food.name, price: food.price, quantity });
    }

    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee = subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    const payload = {
      orderCode: 'SE' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 90 + 10),
      customer: { name, phone, address },
      items: orderItems,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      paymentMethod: paymentMethod === 'UPI (demo)' ? 'UPI (demo)' : 'Cash on Delivery',
    };

    let order;
    if (dbConnected) {
      order = await Order.create(payload);
    } else {
      order = { ...payload, createdAt: new Date().toISOString() };
      demoOrders.set(payload.orderCode, order);
    }
    res.status(201).json({ success: true, message: 'Order place ho gaya!', data: withStatus(order) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Order place nahi ho paya. Dobara try karo.' });
  }
});

// GET /api/orders/:code  -> order track karo
router.get('/:code', async (req, res) => {
  try {
    const code = req.params.code.trim().toUpperCase();
    const order = req.app.locals.dbConnected ? await Order.findOne({ orderCode: code }) : demoOrders.get(code);
    if (!order) return res.status(404).json({ success: false, message: 'Is ID ka koi order nahi mila.' });
    res.json({ success: true, data: withStatus(order) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Order load nahi ho paya.' });
  }
});

module.exports = router;
