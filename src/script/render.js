import { cart, state } from './state.js';

const toRupiah = (num) => {
  return num.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
};

export function renderProducts() {
  const container = document.getElementById('product-grid');
  container.innerHTML = state.filtered
    .map((p) => {
      const isAdded = state.cart.some((item) => item.id === p.id);
      
      return `<div class="product-item" data-id="${p.id}">
        <img src="${p.image}" alt="">
        <h3 class="item-name">${p.name}</h3>
        <h4 class="item-series">${p.series} Series</h4>
        <h2 class="item-price">${toRupiah(p.price)}</h2>
        <span class="item-rating">⭐${p.rating}</span>
        <button class="add-cart-btn" ${isAdded ? 'disabled' : ''}>
        ${isAdded ? 'Added✓' : 'Add to Cart'}</button>
      </div>`;
    })
    .join('');
}

export function renderCart() {
  const cartList = document.getElementById('cart-list');
  if (state.cart.length > 0) {
    cartList.innerHTML = state.cart
      .map((p) => {
        return `
      <li class="cart-item" data-id="${p.id}">
        <button class="remove-cart-item">🗑️</button>
        <img src="${p.image}" alt="">
        <h2 class="cart-item-name">${p.name}</h2>
        <h2 class="cart-item-price">${toRupiah(p.price)}</h2>
        <div class="control-qty">
        <button class="decrease-qty">-</button>
        <span class="qty-count">${p.quantity}</span>
        <button class="increase-qty">+</button>
        </div>
        <span class="cart-item-subtotal">Subtotal: ${toRupiah(p.price * p.quantity)}</span>
      </li>
      `;
      })
      .join('');
  } else {
    cartList.innerHTML = `<p id="no-item-cart">Your cart is empty</p>`;
  }

  document.getElementById('cart-total').innerText = toRupiah(cart.getTotal());
}

export function updateCartBadge() {
  document.getElementById('cart-badge').innerText = Number(cart.getCount());
}
