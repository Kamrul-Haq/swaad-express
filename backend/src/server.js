require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Food = require('./models/Food');
const { sampleFoods } = require('./data/sampleFoods');

const app = express();
app.use(cors());
app.use(express.json());
app.locals.dbConnected = false;

app.get('/api/health', (req, res) =>
  res.json({ success: true, status: 'Swaad Express API chal rahi hai', database: app.locals.dbConnected ? 'connected' : 'demo mode' })
);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: 'Route nahi mila.' }));

const PORT = process.env.PORT || 5000;

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3500 });
      app.locals.dbConnected = true;
      // Pehli baar menu khaali ho to sample foods daal do
      if ((await Food.countDocuments()) === 0) {
        await Food.insertMany(sampleFoods.map(({ _id, ...food }) => food));
        console.log('Sample menu database mein daal diya.');
      }
      console.log('MongoDB connected.');
    } catch (error) {
      console.warn('MongoDB connect nahi hua, demo mode mein chal rahe hain:', error.message);
    }
  } else {
    console.log('MONGODB_URI set nahi hai, demo mode mein chal rahe hain.');
  }
  app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
}

start();
