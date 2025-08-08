// app/api/cart/route.ts

import { NextResponse } from 'next/server';
import { getCart, addToCart, updateCartQuantity } from '../../../lib/cart'; // Importa la nueva función

// Maneja solicitudes GET para obtener el contenido del carrito
export async function GET() {
  return NextResponse.json(getCart());
}

// Maneja solicitudes POST para agregar un producto al carrito
export async function POST(request: Request) {
  const body = await request.json();
  const { productId } = body;
  if (!productId) {
    return NextResponse.json({ message: 'Product ID is required.' }, { status: 400 });
  }

  const updatedCart = addToCart(parseInt(productId));
  return NextResponse.json(updatedCart);
}

// Maneja solicitudes PUT para actualizar la cantidad de un producto en el carrito
export async function PUT(request: Request) {
  const body = await request.json();
  const { productId, quantity } = body;

  if (!productId || quantity === undefined) { // Asegura que se proporcionen ambos datos
    return NextResponse.json({ message: 'Product ID and quantity are required.' }, { status: 400 });
  }

  const updatedCart = updateCartQuantity(parseInt(productId), quantity);
  return NextResponse.json(updatedCart);
}

