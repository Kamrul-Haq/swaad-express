import { useEffect, useMemo, useState } from 'react';
import { ShoppingBag, Search, PackageSearch } from 'lucide-react';
import { getFoods } from './api.js';
import FoodCard from './components/FoodCard.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import TrackModal from './components/TrackModal.jsx';

function loadCart() {
  try { return JSON.parse(localStorage.getItem('swaad-cart')) || []; } catch { return []; }
}

export default function App() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [category, setCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState(loadCart);
  const [screen, setScreen] = useState(null); // null | 'cart' | 'checkout' | 'track'
  const [placedCode, setPlacedCode] = useState(null);
  const [toast, setToast] = useState('');

  function loadMenu() {
    setLoading(true);
    setLoadError('');
    getFoods()
      .then(setFoods)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadMenu, []);
  useEffect(() => localStorage.setItem('swaad-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const categories = useMemo(() => ['All', ...new Set(foods.map((f) => f.category))], [foods]);
  const visibleFoods = foods.filter(
    (f) =>
      (category === 'All' || f.category === category) &&
      (!vegOnly || f.isVeg) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );
  const itemCount = cart.reduce((n, i) => n + i.quantity, 0);

  function addToCart(food) {
    setCart((old) => {
      const found = old.find((i) => i._id === food._id);
      if (found) return old.map((i) => (i._id === food._id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...old, { _id: food._id, name: food.name, price: food.price, emoji: food.emoji, quantity: 1 }];
    });
    setToast(`${food.name} cart mein add ho gaya`);
  }

  const changeQty = (id, amount) =>
    setCart((old) => old.map((i) => (i._id === id ? { ...i, quantity: i.quantity + amount } : i)).filter((i) => i.quantity > 0));
  const removeItem = (id) => setCart((old) => old.filter((i) => i._id !== id));

  function onPlaced(order) {
    setCart([]);
    setPlacedCode(order.orderCode);
    setScreen('track');
  }

  function closeTrack() {
    setScreen(null);
    setPlacedCode(null);
  }

  return (
    <div className="page">
      <header className="header">
        <a className="logo" href="#home">🍛 Swaad Express</a>
        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <button className="ghost-btn" onClick={() => setScreen('track')}><PackageSearch size={17} /> Track</button>
          <button className="btn" onClick={() => setScreen('cart')}><ShoppingBag size={17} /> Cart ({itemCount})</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div>
          <p className="kicker">GHAR BAITHE ORDER KARO</p>
          <h1>Garma garam khaana,<br /><span>seedha aapke darwaze par.</span></h1>
          <p>Pizza se lekar dosa tak, apni pasand ka khaana chuno aur 30 minute ke andar mangwao.</p>
          <a className="btn big" href="#menu">Menu dekho</a>
        </div>
        <div className="hero-emoji" aria-hidden="true">🍕</div>
      </section>

      <main className="menu" id="menu">
        <div className="section-title">
          <h2>Aaj kya khaana hai?</h2>
          <p>Free delivery ₹499 se upar ke orders par.</p>
        </div>

        <div className="filters">
          <div className="categories">
            {categories.map((c) => (
              <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <div className="filter-right">
            <label className="veg-toggle">
              <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} /> Sirf veg
            </label>
            <div className="search-box">
              <Search size={16} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Khaana search karo..." />
            </div>
          </div>
        </div>

        {loading && <p className="empty">Menu load ho raha hai...</p>}
        {loadError && (
          <div className="empty">
            <p>{loadError}</p>
            <button className="btn" onClick={loadMenu}>Dobara try karo</button>
          </div>
        )}
        {!loading && !loadError && visibleFoods.length === 0 && <p className="empty">Kuch nahi mila. Dusra naam ya category try karo.</p>}

        <div className="food-grid">
          {visibleFoods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              quantity={cart.find((i) => i._id === food._id)?.quantity || 0}
              onAdd={addToCart}
            />
          ))}
        </div>
      </main>

      <section className="about" id="about">
        <h2>Swaad Express ke baare mein</h2>
        <p>Ye MERN stack (MongoDB, Express, React, Node.js) par bana ek simple food delivery project hai.</p>
      </section>
      <footer>© 2026 Swaad Express | MCA College Project</footer>

      {screen === 'cart' && (
        <CartDrawer cart={cart} onClose={() => setScreen(null)} onChangeQty={changeQty} onRemove={removeItem} onCheckout={() => setScreen('checkout')} />
      )}
      {screen === 'checkout' && (
        <CheckoutModal cart={cart} onClose={() => setScreen(null)} onBack={() => setScreen('cart')} onPlaced={onPlaced} />
      )}
      {screen === 'track' && <TrackModal initialCode={placedCode} justPlaced={!!placedCode} onClose={closeTrack} />}

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
