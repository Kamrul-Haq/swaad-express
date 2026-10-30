import { useState } from 'react';
import { X, ArrowLeft, LoaderCircle } from 'lucide-react';
import { placeOrder } from '../api.js';
import { getBill } from '../utils.js';

export default function CheckoutModal({ cart, onClose, onBack, onPlaced }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', paymentMethod: 'Cash on Delivery' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { delivery, total } = getBill(cart);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) return setError('Sahi 10 digit mobile number daalo.');
    setLoading(true);
    try {
      const order = await placeOrder({
        customer: { name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() },
        items: cart.map((i) => ({ foodId: i._id, quantity: i.quantity })), // price server khud nikalta hai
        paymentMethod: form.paymentMethod,
      });
      onPlaced(order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="backdrop center" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal">
        <div className="panel-head">
          <button className="back-btn" onClick={onBack}><ArrowLeft size={16} /> Cart par wapas</button>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <h2>Delivery details</h2>
        <form className="form" onSubmit={submit}>
          <label>Poora naam
            <input name="name" value={form.name} onChange={update} required minLength={2} maxLength={60} />
          </label>
          <label>Mobile number
            <input name="phone" value={form.phone} onChange={update} inputMode="numeric" maxLength={10} placeholder="10 digit number" required />
          </label>
          <label>Delivery address
            <textarea name="address" value={form.address} onChange={update} rows={3} minLength={8} maxLength={300} placeholder="Ghar no., gali, area, landmark" required />
          </label>
          <label>Payment
            <select name="paymentMethod" value={form.paymentMethod} onChange={update}>
              <option>Cash on Delivery</option>
              <option>UPI (demo)</option>
            </select>
          </label>
          <div className="pay-total">
            <span>Total payable</span>
            <b>₹{total}</b>
            <small>{delivery === 0 ? 'Free delivery lag gayi' : `₹${delivery} delivery fee include hai`}</small>
          </div>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="btn full" type="submit" disabled={loading}>
            {loading ? <><LoaderCircle size={17} className="spin" /> Order ho raha hai...</> : 'Order place karo'}
          </button>
          <p className="muted center-text">College project demo. Asli payment nahi li jaati.</p>
        </form>
      </section>
    </div>
  );
}
