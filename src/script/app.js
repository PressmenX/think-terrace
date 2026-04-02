import {
  state,
  cart,
  setProducts,
  setFilter,
  applyFilters,
  saveCart,
  loadCart,
} from './state.js';
import renderProducts from './render.js';

async function initApp() {
  try {
    const res = await fetch('/src/data/products.json');
    if (!res.ok) throw new Error('Failed to load data');

    const data = await res.json();
    setProducts(data);
    loadCart();
    renderProducts();
    initFilters();

    console.log(state);
  } catch (err) {
    console.log('Error', err.message);
  }
}

function initFilters() {
  document.getElementById('filter-category').addEventListener('change', (e) => {
    const value = e.target.value;
    setFilter('category', value);
    applyFilters();
    renderProducts();
  });
  document.getElementById('filter-price').addEventListener('input', (e) => {
    const value = Number(e.target.value);
    document.getElementById('price-output').innerText = value.toLocaleString('id-ID', {
      style : 'currency',
      currency : "IDR",
      minimumFractionDigits : 0,
    })
    setFilter('maxPrice', value);
    applyFilters();
    renderProducts();
  });
  document.getElementById('sort-by').addEventListener('change', (e) => {
    const value = e.target.value;
    setFilter('sortBy', value);
    applyFilters();
    renderProducts();
  });
}

initApp();
