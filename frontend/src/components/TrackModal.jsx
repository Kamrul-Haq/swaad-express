import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { getOrder } from '../api.js';

const STEPS = ['Order confirmed', 'Preparing', 'Out for delivery', 'Delivered'];

export default function TrackModal({ initialCode, justPlaced, onClose }) {
  const [code, setCode] = useState(initialCode || '');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function track(value) {
    setError('');
    setOrder(null);
    setLoading(true);
    try {
      setOrder(await getOrder(value));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Order place hone ke baad seedha uska status dikhao
  useEffect(() => {
    if (initialCode) track(initialCode);
  }, [initialCode]);

  const step = order ? STEPS.indexOf(order.status) : -1;

  return (
    <div className="backdrop center" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal">
        <div className="panel-head">
          <h2>{justPlaced ? 'Order place ho gaya!' : 'Order track karo'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>

        {justPlaced && order && (
          <p className="success-note">
            Aapka Order ID: <b>{order.orderCode}</b>. Isse save kar lo, tracking ke kaam aayega.
          </p>
        )}

        <form className="track-form" onSubmit={(e) => { e.preventDefault(); code.trim() && track(code); }}>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Order ID likho (e.g. SE12345678)" />
          <button className="btn" type="submit" disabled={loading}>{loading ? '...' : 'Track'}</button>
        </form>
        {error && <div className="form-error">{error}</div>}

        {order && (
          <div className="track-result">
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s} className={i <= step ? 'done' : ''}>
                  <span className="step-dot">{i <= step ? <Check size={13} /> : i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="bill">
              {order.items.map((i) => (
                <p key={i.foodId}><span>{i.name} x{i.quantity}</span><b>₹{i.price * i.quantity}</b></p>
              ))}
              <p><span>Delivery fee</span><b>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</b></p>
              <h3><span>Total ({order.paymentMethod})</span><span>₹{order.total}</span></h3>
            </div>
            <p className="muted">Deliver to: {order.customer.name}, {order.customer.address}</p>
            <p className="muted">Demo mein status time ke saath khud badalta hai.</p>
          </div>
        )}
      </section>
    </div>
  );
}
