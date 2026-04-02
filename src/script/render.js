import { state } from './state.js';

export default function renderProducts() {
  const container = document.getElementById('product-grid');
  container.innerHTML = state.filtered
    .map((p) => {
      return `<div class="product-item" data-id="${p.id}">
        <img src="${p.image}" alt="">
        <h3 class="item-name">${p.name}</h3>
        <h4 class="item-series">${p.series} Series</h4>
        <h2 class="item-price">${p.price.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        })}</h2>
        <span class="item-rating">⭐${p.rating}</span>
        <button class="add-cart-btn">Add to Cart</button>
      </div>`;
    })
    .join('');
}
