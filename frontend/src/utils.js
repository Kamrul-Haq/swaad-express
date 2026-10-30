export const DELIVERY_FEE = 29;
export const FREE_DELIVERY_ABOVE = 499;

// Cart ka bill nikaalo
export function getBill(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery };
}
