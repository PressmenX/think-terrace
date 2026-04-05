import {
  state,
  cart,
  setProducts,
  setFilter,
  applyFilters,
  saveCart,
  loadCart,
} from './state.js';
import { renderProducts, renderCart, updateCartBadge } from './render.js';

async function initApp() {
  try {
    const res = await fetch('./products.json');
    if (!res.ok) throw new Error('Failed to load data');

    const data = await res.json();
    setProducts(data);
    loadCart();
    renderCart();
    renderProducts();
    initFilters();
    initCartEvents();
    updateCartBadge();
  } catch (err) {
    console.log('Error', err);
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
    document.getElementById('price-output').innerText = value.toLocaleString(
      'id-ID',
      {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }
    );
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

function initCartEvents() {
  document.getElementById('product-grid').addEventListener('click', (e) => {
    const button = e.target.closest('.add-cart-btn');
    if (button) {
      const item = button.closest('.product-item');
      const itemId = Number(item.dataset.id);
      cart.add(itemId);
      saveCart();
      renderCart();
      updateCartBadge();
      renderProducts()
    }
  });

  document.getElementById('cart-btn').addEventListener('click', () => {
    document.getElementById('cart-overlay').classList.toggle('show');
    document.getElementById('cart-drawer').classList.toggle('show');
  });

  document.getElementById('cart-close-btn').addEventListener('click', () => {
    document.getElementById('cart-overlay').classList.remove('show');
    document.getElementById('cart-drawer').classList.remove('show');
  });

  document.getElementById('cart-list').addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const item = button.closest('.cart-item');
    const itemId = Number(item.dataset.id);
    let quantity = state.cart.find((p) => p.id === itemId)?.quantity ?? 0;
    if (button.classList.contains('remove-cart-item')) cart.remove(itemId);
    else if (button.classList.contains('increase-qty')) cart.update(itemId, quantity+1);
    else if (button.classList.contains('decrease-qty') && quantity > 0) 
      cart.update(itemId, quantity-1);

    saveCart();
    renderCart();
    updateCartBadge();
    renderProducts()
  });
}

initApp();
