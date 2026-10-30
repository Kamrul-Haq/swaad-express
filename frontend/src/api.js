// Backend se baat karne ka ek hi jagah code
async function request(path, options = {}) {
  try {
    const res = await fetch('/api' + path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const body = await res.json();
    if (!res.ok || !body.success) throw new Error(body.message || 'Kuch galat ho gaya.');
    return body.data;
  } catch (err) {
    if (err instanceof TypeError) throw new Error('Server se connect nahi ho paya. Pehle backend start karo.');
    throw err;
  }
}

export const getFoods = () => request('/foods');
export const placeOrder = (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) });
export const getOrder = (code) => request('/orders/' + encodeURIComponent(code));
