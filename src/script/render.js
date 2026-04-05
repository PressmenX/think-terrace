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

  if (state.filtered.length > 0) {
    container.innerHTML = state.filtered
      .map((p) => {
        const isAdded = state.cart.some((item) => item.id === p.id);

        return `<div class="product-item" data-id="${p.id}">
        <img src="${p.image}" alt="">
        <div class="product-info">
          <h4 class="item-name">${p.name}</h4>
          <h4 class="item-series">${p.series} Series</h4>
          <h3 class="item-price">${toRupiah(p.price)}</h3>
        </div>
        <div class="product-footer">
          <span class="item-rating"><span>★</span>${p.rating}</span>
          <button class="add-cart-btn" ${isAdded ? 'disabled' : ''}>
          ${isAdded ? '✓ Added' : '+ Add to Cart'}</button>
        </div>
      </div>`;
      })
      .join('');
  } else {
    container.innerHTML = `<div id="no-match">No products match your criteria.

</div>`
  }
}

export function renderCart() {
  const cartList = document.getElementById('cart-list');
  if (state.cart.length > 0) {
    cartList.innerHTML = state.cart
      .map((p) => {
        return `
      <li class="cart-item" data-id="${p.id}">
        <button class="remove-cart-item"><span class="material-symbols-outlined delete-icon">
              delete
        </span></button>
        <img src="${p.image}" alt="">
        <div class="cart-info">
          <h4 class="cart-item-name">${p.name}</h4>
          <p class="cart-item-price">${toRupiah(p.price)}</p>
        </div>
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
    cartList.innerHTML = `
    <div id="no-item-cart">
      <span class="material-symbols-outlined cart-icon">shopping_cart</span>
      <p>Your cart is empty</p>
    </div>`;
  }

  document.getElementById('cart-total').innerText = toRupiah(cart.getTotal());
}

export function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (state.cart.length > 0) {
    badge.classList.add('show');
    badge.innerText = Number(cart.getCount());
  } else badge.classList.remove('show');
}
