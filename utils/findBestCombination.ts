// utils/findBestCombination.ts

interface Product {
  id: number;
  name: string;
  price: number;
}

/**
 * Encuentra la mejor combinación de productos para un presupuesto dado.
 * Utiliza un enfoque recursivo para explorar todas las combinaciones posibles.
 * @param products - Lista de todos los productos disponibles.
 * @param budget - Presupuesto máximo.
 * @returns Una lista de los productos en la mejor combinación.
 */
export function findBestCombination(products: Product[], budget: number): Product[] {
  let bestCombination: Product[] = [];
  let bestValue = 0;

  // Función recursiva principal que explora las combinaciones
  function findCombinationsRecursive(index: number, currentCombination: Product[], currentCost: number) {
    // Caso base: Si hemos considerado todos los productos
    if (index === products.length) {
      // Si la combinación actual es válida (no excede el presupuesto)
      // y tiene un valor total mayor que la mejor encontrada hasta ahora, la guardamos.
      if (currentCost <= budget && currentCost > bestValue) {
        bestValue = currentCost;
        bestCombination = [...currentCombination]; // Se crea una copia para evitar mutaciones
      }
      return;
    }

    // Opción 1: Incluir el producto actual
    const product = products[index];
    if (currentCost + product.price <= budget) {
      findCombinationsRecursive(
        index + 1, // Pasamos al siguiente producto
        [...currentCombination, product], // Añadimos el producto a la combinación actual
        currentCost + product.price // Sumamos su precio al costo actual
      );
    }

    // Opción 2: No incluir el producto actual
    // Continuamos con el siguiente producto sin modificar la combinación ni el costo
    findCombinationsRecursive(index + 1, currentCombination, currentCost);
  }

  // Se inicia la recursión desde el primer producto, con una combinación vacía y costo 0
  findCombinationsRecursive(0, [], 0);
  
  return bestCombination;
}
