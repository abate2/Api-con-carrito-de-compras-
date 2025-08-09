API y Carrito de Compras (Prueba Técnica)
Este proyecto es una aplicación web full-stack básica desarrollada con Next.js, React y TypeScript, que simula la  agregacion de  productos y gestión de un carrito de compras. Además, incluye una funcion  para encontrar la mejor combinación de productos dentro de un presupuesto dado.

🚀 Características Principales
Backend (API Routes): Implementación de una API RESTful usando las API Routes de Next.js para gestionar productos y un carrito en memoria.

Frontend (React/Next.js): Una interfaz de usuario interactiva para mostrar productos, agregar/eliminar/actualizar ítems en el carrito, y visualizar la mejor combinación de productos.

Lógica de Combinación Óptima: Una función que resuelve una versión simplificada del problema de la mochila (Knapsack Problem) para optimizar la selección de productos según un presupuesto.

Estilos Modernos: Uso de Tailwind CSS para un diseño responsivo y atractivo.

📦 Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

app/: Contiene los componentes de React para el frontend y las rutas de la API (app/api).

app/page.tsx: El componente principal del frontend donde se muestra la interfaz de la tienda.

app/api/products/route.ts: Endpoint para obtener la lista estática de productos.

app/api/cart/route.ts: Endpoint para gestionar el carrito (obtener, agregar, actualizar cantidad).

data/: Almacena los datos estáticos, como la lista de productos inicial.

data/products.ts: La lista de productos fijos de la tienda.

lib/: Contiene la lógica central del carrito que es compartida por los endpoints de la API.

lib/cart.ts: Funciones para getCart, addToCart y updateCartQuantity.

utils/: Contiene funciones de utilidad que no son específicas de la UI o la API.

utils/findBestCombination.ts: La implementación del algoritmo para encontrar la mejor combinación de productos.

✨ Detalles de Implementación
Parte 1: Backend (API)
He implementado los siguientes endpoints utilizando las API Routes de Next.js (modelo app):

GET /api/products: Devuelve una lista estática de productos.

GET /api/cart: Devuelve el contenido actual del carrito de compras.

POST /api/cart: Recibe un productId en el cuerpo de la solicitud y agrega ese producto (o incrementa su cantidad) al carrito en memoria.

PUT /api/cart: Recibe un productId y una quantity en el cuerpo de la solicitud, y actualiza la cantidad de ese producto en el carrito. Si la cantidad es 0 o menos, el producto se elimina del carrito.

 El carrito se mantiene en memoria..

Parte 2: Frontend
El frontend, construido con React en Next.js, consume los endpoints de la API para ofrecer las siguientes funcionalidades:

Visualización de Productos: Obtiene y muestra la lista de productos desde /api/products en un diseño de cuadrícula.

Gestión del Carrito:

Un botón "Agregar al carrito" en cada producto envía una solicitud POST a /api/cart.

La sección del carrito muestra los productos agregados, incluyendo su nombre y cantidad.

Botones + y - junto a cada ítem del carrito permiten ajustar la cantidad o eliminar el producto (enviar solicitud PUT a /api/cart).

Un ícono de carrito en la cabecera muestra la cantidad total de ítems en el carrito en tiempo real.

Diseño: Se utilizaron clases de Tailwind CSS para crear una interfaz básica pero limpia y responsiva, con énfasis en colores suaves y elementos interactivos.

🛠️ Cómo Ejecutar el Proyecto


Si lo quieres ver  en la  web puedes  probarlo en el siguiente link [CarritoCompras](https://api-con-carrito-de-compras.onrender.com).

Sigue estos pasos para poner en marcha la aplicación en tu entorno local:

Prerrequisitos
Node.js: Asegúrate de tener Node.js (versión 18 o superior recomendada) instalado en tu sistema. Puedes descargarlo desde nodejs.org.

npm: Viene incluido con Node.js.

Instalación
Clona el repositorio:

git clone https://github.com/abate2/Api-con-carrito-de-compras-
cd Api-con-carrito-de-compras- # Navega a la carpeta del proyecto

Instala las dependencias:

npm install

Ejecución
Inicia el servidor de desarrollo:

npm run dev

Accede a la aplicación: Abre tu navegador y visita http://localhost:3000.

Pruebas de API (Opcional)
Puedes usar herramientas como la extensión "REST Client" de VS Code, Postman o Insomnia para probar los endpoints de la API:

GET http://localhost:3000/api/products

GET http://localhost:3000/api/cart

POST http://localhost:3000/api/cart con Body: raw (JSON) -> { "productId": 1 }

PUT http://localhost:3000/api/cart con Body: raw (JSON) -> { "productId": 1, "quantity": 2 }

🚀 Despliegue
Este proyecto está configurado para ser desplegado fácilmente en plataformas como Render. Para desplegar, se debe configurar un "Web Service" (no "Static Site") y usar los comandos de npm install && npm run build para la construcción y npm start para el inicio del servidor.

🙏 Agradecimientos
Agradezco la oportunidad de trabajar en esta prueba técnica.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
