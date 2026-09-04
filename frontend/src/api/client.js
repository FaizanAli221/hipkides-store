// API Client for HipKids backend
const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data.message || `Request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Health check
  getHealth: () => request('/health'),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const queryString = query.toString();
    return request(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getProductById: (idOrSlug) => request(`/products/${idOrSlug}`),

  // Categories
  getCategories: (type) => {
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    return request(`/categories${query}`);
  },

  // Promos / Hero Banners
  getPromos: () => request('/promos'),

  // Orders
  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getOrderById: (orderId) => request(`/orders/${orderId}`),

  // Newsletter
  subscribeNewsletter: (email) =>
    request('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

export default api;
