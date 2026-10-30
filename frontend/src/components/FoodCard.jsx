import { Plus, Star, Clock3 } from 'lucide-react';

export default function FoodCard({ food, quantity, onAdd }) {
  return (
    <article className="food-card">
      <div className="food-visual">
        {food.image ? <img src={food.image} alt={food.name} /> : <span className="food-emoji">{food.emoji}</span>}
        <span className={`veg-mark ${food.isVeg ? 'veg' : 'nonveg'}`} title={food.isVeg ? 'Veg' : 'Non-veg'}>
          <span />
        </span>
        <span className="prep-time"><Clock3 size={12} /> {food.prepTime}</span>
      </div>
      <div className="food-info">
        <div className="food-title-row">
          <h3>{food.name}</h3>
          <span className="rating"><Star size={12} fill="currentColor" /> {food.rating}</span>
        </div>
        <p className="food-desc">{food.description}</p>
        <div className="food-bottom">
          <strong>₹{food.price}</strong>
          <button className="add-btn" onClick={() => onAdd(food)}>
            <Plus size={16} /> {quantity > 0 ? `Add (${quantity})` : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
