# Swaad Express - Food Delivery (MERN)

MCA college project. React (Vite) + Node.js + Express + MongoDB.

## Features
- Menu: category filter, "Sirf veg" toggle, search
- Cart: quantity badhao/ghatao, remove, cart refresh karne par bhi bachta hai (localStorage)
- Bill: subtotal + delivery fee (Rs 499 se upar free)
- Checkout: naam, mobile (10 digit), address, payment (COD / UPI demo)
- Order ID milti hai, **Track** button se order status dekh sakte ho
- Server order ki price khud menu se nikaalta hai (client ki bheji price par bharosa nahi)
- **Demo mode**: MongoDB na ho tab bhi app chalta hai (data server band hone par chala jaata hai)

## Run kaise karein

### 1. Backend
```bash
cd backend
npm install
npm run dev        # nodemon na ho to: npm start
```
`.env` file already di hai (`MONGODB_URI=mongodb://127.0.0.1:27017/swaad_express`).
MongoDB chalu hai to menu apne aap database mein save ho jata hai. Chalu nahi hai to ~4 sec baad demo mode mein start hoga.

### 2. Frontend (naya terminal)
```bash
cd frontend
npm install
npm run dev
```
Browser mein kholo: http://localhost:5173

## API
| Method | URL | Kaam |
|---|---|---|
| GET | /api/health | server aur database ka status |
| GET | /api/foods?category=&search=&veg=true | menu |
| POST | /api/orders | order place karo |
| GET | /api/orders/:orderCode | order track karo |

## Structure
```
backend/src   server.js, models/ (Food, Order), routes/ (foodRoutes, orderRoutes), data/sampleFoods.js
frontend/src  App.jsx, api.js, utils.js, styles.css, components/ (FoodCard, CartDrawer, CheckoutModal, TrackModal)
```
