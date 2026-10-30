import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { getBill, FREE_DELIVERY_ABOVE } from '../utils.js';

export default function CartDrawer({ cart, onClose, onChangeQty, onRemove, onCheckout }) {
  const { subtotal, delivery, total } = getBill(cart);

  return (
    <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="drawer" aria-label="Your cart">
        <div className="panel-head">
          <h2>Aapka cart</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart"><X size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={42} />
            <h3>Cart abhi khaali hai</h3>
            <p>Menu se kuch tasty add karo.</p>
            <button className="btn" onClick={onClose}>Menu dekho</button>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <span className="cart-emoji">{item.emoji}</span>
                  <div className="cart-info">
                    <b>{item.name}</b>
                    <span className="muted">₹{item.price} each</span>
                    <div className="qty">
                      <button onClick={() => onChangeQty(item._id, -1)} aria-label="Quantity kam karo"><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onChangeQty(item._id, 1)} aria-label="Quantity badhao"><Plus size={13} /></button>
                    </div>
                  </div>
                  <div className="cart-right">
                    <b>₹{item.price * item.quantity}</b>
                    <button className="icon-btn" onClick={() => onRemove(item._id)} aria-label="Remove item"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bill">
              <p><span>Subtotal</span><b>₹{subtotal}</b></p>
              <p><span>Delivery fee</span><b>{delivery === 0 ? 'FREE' : `₹${delivery}`}</b></p>
              {subtotal < FREE_DELIVERY_ABOVE && (
                <p className="tip">₹{FREE_DELIVERY_ABOVE - subtotal} aur add karo, delivery free ho jayegi.</p>
              )}
              <h3><span>Total</span><span>₹{total}</span></h3>
              <button className="btn full" onClick={onCheckout}>Checkout karo</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
