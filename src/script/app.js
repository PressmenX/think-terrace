import { state, cart, setProducts,setFilter,applyFilters,saveCart,loadCart } from "./state.js";
import renderProducts from './render.js'

async function initApp() {
  try {
    const res = await fetch('/src/data/products.json')
    if(!res.ok) throw new Error('Failed to load data');

    const data = await res.json()
    setProducts(data)
    loadCart()
    renderProducts()

    console.log(state);
  } catch (err) {
    console.log('Error', err.message);
  }
}

initApp()

