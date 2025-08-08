"use client"; // Directiva para indicar que es un Client Component

import { useEffect, useState } from 'react';
// Importación CORRECTA para findBestCombination desde utils
import { findBestCombination } from '../utils/findBestCombination'; 

// Definición de interfaces para tipado seguro
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function HomePage() {
  // Estados para manejar los datos del frontend
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bestCombination, setBestCombination] = useState<Product[]>([]);
  
  // Presupuesto para el ejercicio de lógica
  const myBudget = 250; 

  // Función para obtener los productos del backend
  async function fetchProducts() {
    try {
      const res = await fetch('http://localhost:3000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  // Función para obtener los productos del carrito
  async function fetchCart() {
    try {
      const res = await fetch('http://localhost:3000/api/cart');
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  }

  // Función para agregar un producto al carrito (llamada desde el botón "Agregar")
  async function addToCart(productId: number) {
    try {
      await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      await fetchCart(); // Actualiza el carrito en la UI después de agregar
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  }

  // Función para actualizar la cantidad de un producto en el carrito (llamada desde +/-)
  async function updateQuantity(productId: number, quantity: number) {
    try {
      await fetch('http://localhost:3000/api/cart', {
        method: 'PUT', // Usamos el método PUT para actualizar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      await fetchCart(); // Actualiza el carrito en la UI después de modificar
    } catch (error) {
      console.error("Error al actualizar la cantidad del carrito:", error);
    }
  }

  // Primer useEffect: Carga inicial de productos y carrito
  // Se ejecuta solo una vez al montar el componente (dependencia vacía [])
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); 

  // Segundo useEffect: Calcula la mejor combinación cuando los productos están disponibles
  // Se ejecuta cuando 'products' o 'myBudget' cambian.
  useEffect(() => {
    if (products.length > 0) { // Asegura que los productos ya se hayan cargado
      const optimalCombination = findBestCombination(products, myBudget);
      setBestCombination(optimalCombination);
    }
  }, [products, myBudget]); 

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Tienda de Compras</h1>

      {/* Sección de la lista de productos disponibles */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Productos Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600">Precio: ${product.price}</p>
              <button 
                onClick={() => addToCart(product.id)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8" />

      {/* Sección del carrito de compras actual */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
        <div className="border p-4 rounded-lg shadow">
          {cart.length === 0 ? (
            <p>El carrito está vacío. ¡Agrega algunos productos!</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="mb-2 flex items-center justify-between">
                  <div>
                    {item.name} - Cantidad: {item.quantity}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <hr className="my-8" />

      {/* Sección de la mejor combinación de productos para el presupuesto */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Mejor Combinación para un Presupuesto de ${myBudget}</h2>
        <div className="border p-4 rounded-lg shadow">
          {bestCombination.length === 0 ? (
            <p>No se encontró ninguna combinación o no hay productos.</p>
          ) : (
            <div>
              <ul>
                {bestCombination.map((product) => (
                  <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
              </ul>
              <p className="mt-2 font-bold">Costo total: ${bestCombination.reduce((acc, p) => acc + p.price, 0)}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
