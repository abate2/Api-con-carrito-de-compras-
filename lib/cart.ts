// lib/cart.ts

import { products } from '../data/products';

// El carrito se almacena como un objeto donde la clave es el ID del producto
// y el valor es la cantidad.
const cart: { [key: number]: number } = {};

// Función para obtener los productos actuales del carrito con sus detalles completos
export function getCart() {
  const cartItems = Object.keys(cart).map(productId => {
    const product = products.find(p => p.id === parseInt(productId));
    // Retorna el producto con su cantidad si existe y su cantidad es mayor a 0
    return product && cart[parseInt(productId)] > 0 ? { ...product, quantity: cart[parseInt(productId)] } : null;
  }).filter(item => item !== null); // Filtra cualquier elemento nulo (productos no encontrados o con cantidad 0)
  
  return cartItems;
}

// Función para agregar un producto al carrito o incrementar su cantidad
export function addToCart(productId: number) {
  if (cart[productId]) {
    cart[productId] += 1; // Incrementa la cantidad si ya existe
  } else {
    cart[productId] = 1; // Añade el producto con cantidad 1 si no existe
  }
  return getCart(); // Retorna el carrito actualizado
}

// Función para actualizar la cantidad de un producto específico en el carrito
export function updateCartQuantity(productId: number, newQuantity: number) {
    if (newQuantity <= 0) {
        // Si la nueva cantidad es 0 o menos, elimina el producto del carrito
        delete cart[productId];
    } else {
        // Actualiza la cantidad del producto a la nueva cantidad
        cart[productId] = newQuantity;
    }
    return getCart(); // Retorna el carrito actualizado
}
