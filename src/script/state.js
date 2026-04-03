
const state = {
  products: [],
  filtered: [],
  cart: [],
  filters: {
    category: 'all',
    maxPrice: 35000000,
    sortBy: 'default',
  },
};

const cart = (function () {
  return {
    add(idTarget) {
      const product = state.products.find((p) => p.id === idTarget);
      if (!product) return;

      const exisitingProduct = state.cart.find((p) => p.id === idTarget);
      if (exisitingProduct) exisitingProduct.quantity++;
      else state.cart.push({ ...product, quantity: 1 });
    },
    remove(idTarget) {
      state.cart = state.cart.filter((p) => p.id !== idTarget);
    },
    update(idTarget, value) {
      if (value <= 0) {
        this.remove(idTarget);
        return;
      }

      const product = state.cart.find((p) => p.id === idTarget);
      if (!product) return;
      product.quantity = value;
    },
    getTotal() {
      return state.cart.reduce((acc, p) => {
        return acc + p.price * p.quantity;
      }, 0);
    },
    getCount() {
      return state.cart.reduce((acc, p) => {
        return acc + p.quantity;
      }, 0);
    },
  };
})();

function setProducts(data) {
  state.products = data;
  state.filtered = data;
}
function setFilter(key, value) {
  state.filters[key] = value;
}

function applyFilters() {
  let result = [...state.products];
  if (state.filters.category !== 'all') {
    result = result.filter((p) => p.series === state.filters.category);
  }

  result = result.filter((p) => p.price <= state.filters.maxPrice);
  if (state.filters.sortBy === 'price-asc')
    result.sort((a, b) => a.price - b.price);
  else if (state.filters.sortBy === 'price-desc')
    result.sort((a, b) => b.price - a.price);
  else if (state.filters.sortBy === 'rating-desc')
    result.sort((a, b) => b.rating - a.rating);

  state.filtered = result;
}

function saveCart() {
  localStorage.setItem('thinkterrace-cart', JSON.stringify(state.cart))
}

function loadCart(){
  const  data = JSON.parse(localStorage.getItem('thinkterrace-cart')) || []
  state.cart = data
}

export {state, cart, setProducts,setFilter,applyFilters,saveCart,loadCart}