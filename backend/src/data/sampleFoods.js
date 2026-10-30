// Menu ka sample data. DB khaali ho to yahi insert hota hai, DB na ho to demo mode mein yahi use hota hai.
const sampleFoods = [
  { _id: 's1', name: 'Margherita Pizza', category: 'Pizza', price: 199, emoji: '🍕', isVeg: true, rating: 4.4, prepTime: '20-25 min', description: 'Classic cheese pizza with fresh tomato sauce.' },
  { _id: 's2', name: 'Farmhouse Pizza', category: 'Pizza', price: 299, emoji: '🍕', isVeg: true, rating: 4.6, prepTime: '25-30 min', description: 'Capsicum, onion, sweet corn and extra cheese.' },
  { _id: 's3', name: 'Chicken Tikka Pizza', category: 'Pizza', price: 349, emoji: '🍕', isVeg: false, rating: 4.7, prepTime: '25-30 min', description: 'Tandoori chicken pieces on a cheesy base.' },
  { _id: 's4', name: 'Aloo Tikki Burger', category: 'Burger', price: 79, emoji: '🍔', isVeg: true, rating: 4.1, prepTime: '10-15 min', description: 'Crispy aloo patty with mint mayo and onions.' },
  { _id: 's5', name: 'Cheese Burger', category: 'Burger', price: 129, emoji: '🍔', isVeg: true, rating: 4.3, prepTime: '15-20 min', description: 'Veg patty with a thick slice of melted cheese.' },
  { _id: 's6', name: 'Chicken Burger', category: 'Burger', price: 169, emoji: '🍔', isVeg: false, rating: 4.5, prepTime: '15-20 min', description: 'Crunchy chicken fillet with lettuce and sauce.' },
  { _id: 's7', name: 'Paneer Butter Masala', category: 'Indian', price: 220, emoji: '🍛', isVeg: true, rating: 4.6, prepTime: '25-30 min', description: 'Soft paneer cubes in a rich buttery tomato gravy.' },
  { _id: 's8', name: 'Dal Makhani', category: 'Indian', price: 180, emoji: '🍲', isVeg: true, rating: 4.5, prepTime: '25-30 min', description: 'Slow-cooked black lentils with cream and butter.' },
  { _id: 's9', name: 'Butter Chicken', category: 'Indian', price: 280, emoji: '🍗', isVeg: false, rating: 4.8, prepTime: '30-35 min', description: 'Tender chicken in a creamy, mildly spiced gravy.' },
  { _id: 's10', name: 'Butter Naan', category: 'Indian', price: 40, emoji: '🍞', isVeg: true, rating: 4.4, prepTime: '10-15 min', description: 'Soft tandoor naan brushed with butter.' },
  { _id: 's11', name: 'Masala Dosa', category: 'South Indian', price: 90, emoji: '🥞', isVeg: true, rating: 4.5, prepTime: '15-20 min', description: 'Crispy dosa filled with spiced potato, served with chutney.' },
  { _id: 's12', name: 'Idli Sambar', category: 'South Indian', price: 70, emoji: '🍚', isVeg: true, rating: 4.3, prepTime: '10-15 min', description: 'Four soft idlis with hot sambar and coconut chutney.' },
  { _id: 's13', name: 'Veg Hakka Noodles', category: 'Chinese', price: 140, emoji: '🍜', isVeg: true, rating: 4.2, prepTime: '15-20 min', description: 'Wok-tossed noodles with crunchy vegetables.' },
  { _id: 's14', name: 'Veg Manchurian', category: 'Chinese', price: 160, emoji: '🥡', isVeg: true, rating: 4.3, prepTime: '20-25 min', description: 'Fried veg balls in a tangy, spicy soy gravy.' },
  { _id: 's15', name: 'Chocolate Brownie', category: 'Dessert', price: 119, emoji: '🍫', isVeg: true, rating: 4.9, prepTime: '10-15 min', description: 'Warm, fudgy brownie with a gooey centre.' },
  { _id: 's16', name: 'Gulab Jamun (2 pcs)', category: 'Dessert', price: 59, emoji: '🍮', isVeg: true, rating: 4.6, prepTime: '5-10 min', description: 'Soft milk dumplings soaked in sugar syrup.' },
  { _id: 's17', name: 'Mango Lassi', category: 'Drinks', price: 69, emoji: '🥭', isVeg: true, rating: 4.5, prepTime: '5-10 min', description: 'Thick chilled yogurt drink with real mango.' },
  { _id: 's18', name: 'Cold Coffee', category: 'Drinks', price: 89, emoji: '☕', isVeg: true, rating: 4.2, prepTime: '5-10 min', description: 'Creamy iced coffee topped with chocolate.' },
];

module.exports = { sampleFoods };
