"use client"; // Directiva para indicar que es un Client Component

import { useEffect, useState } from 'react';
import { findBestCombination } from '../utils/findBestCombination'; 
import { ShoppingCart } from 'lucide-react'; // Importamos el ícono del carrito

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
      const res = await fetch('/api/products'); 
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  // Función para obtener los productos del carrito
  async function fetchCart() {
    try {
      const res = await fetch('/api/cart'); 
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  }

  // Función para agregar un producto al carrito (llamada desde el botón "Agregar")
  async function addToCart(productId: number) {
    try {
      await fetch('/api/cart', { 
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
      await fetch('/api/cart', { 
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

  // Calculamos la cantidad total de ítems en el carrito
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

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
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8"> {/* Fondo general claro */}
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-4xl"> {/* Contenedor principal con estilo */}
        {/* Encabezado con título y ícono del carrito */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b-2 border-blue-100">
          <h1 className="text-4xl font-extrabold text-blue-700">Tienda de Compras</h1> {/* Título con color principal */}
          <div className="relative cursor-pointer p-2 rounded-full hover:bg-blue-50 transition-colors duration-200">
            <ShoppingCart size={32} className="text-blue-600" /> {/* Ícono del carrito con color */}
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                {totalCartItems}
              </span>
            )}
          </div>
        </header>

        {/* Sección de la lista de productos disponibles */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Productos Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Espacio entre tarjetas */}
            {products.map((product) => (
              <div key={product.id} className="bg-blue-50 border border-blue-200 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"> {/* Estilo de tarjeta de producto */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{product.name}</h3>
                  <p className="text-gray-700 text-lg mb-4">Precio: <span className="font-bold text-green-600">${product.price}</span></p>
                </div>
                <button 
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 transform hover:scale-105 shadow-md"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-8 border-gray-300" /> {/* Línea divisoria más suave */}

        {/* Sección del carrito de compras actual */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Carrito de Compras</h2>
          <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md"> {/* Estilo de tarjeta de carrito */}
            {cart.length === 0 ? (
              <p className="text-gray-600 italic">El carrito está vacío. ¡Agrega algunos productos!</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="mb-3 p-3 bg-gray-50 rounded-md flex items-center justify-between border-b border-gray-100 last:mb-0 last:border-b-0">
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span> - Cantidad: <span className="font-semibold text-blue-700">{item.quantity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full transition-colors duration-200 shadow-sm"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full transition-colors duration-200 shadow-sm"
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

        <hr className="my-8 border-gray-300" />

        {/* Sección de la mejor combinación de productos para el presupuesto */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Mejor Combinación para un Presupuesto de <span className="text-purple-600">${myBudget}</span></h2>
          <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md"> {/* Estilo de tarjeta de combinación */}
            {bestCombination.length === 0 ? (
              <p className="text-gray-600 italic">No se encontró ninguna combinación o no hay productos.</p>
            ) : (
              <div>
                <ul className="mb-3">
                  {bestCombination.map((product) => (
                    <li key={product.id} className="mb-2 text-gray-700">
                      <span className="font-medium">{product.name}</span> - <span className="font-semibold text-orange-600">${product.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xl font-bold text-blue-800">Costo total: <span className="text-green-700">${bestCombination.reduce((acc, p) => acc + p.price, 0)}</span></p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}