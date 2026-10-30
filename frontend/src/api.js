// Local mein VITE_API_URL khaali rehta hai (vite proxy kaam karti hai).
// Live deploy par VITE_API_URL = backend ka URL (e.g. https://swaad-express-api.onrender.com)
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  try {
    const res = await fetch(API_URL + '/api' + path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const body = await res.json();
    if (!res.ok || !body.success) throw new Error(body.message || 'Kuch galat ho gaya.');
    return body.data;
  } catch (err) {
    if (err instanceof TypeError) throw new Error('Server se connect nahi ho paya. Thodi der baad dobara try karo.');
    throw err;
  }
}

export const getFoods = () => request('/foods');
export const placeOrder = (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) });
export const getOrder = (code) => request('/orders/' + encodeURIComponent(code));
