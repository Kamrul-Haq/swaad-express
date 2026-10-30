const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderCode: { type: String, required: true, unique: true }, // e.g. SE12345678
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [{ foodId: String, name: String, price: Number, quantity: Number }],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 29 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
