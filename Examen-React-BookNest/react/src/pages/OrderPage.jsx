import { useOrder } from "../hooks/useOrder.js";

// Página "Mi Pedido".
// Inspírate en `pedido.html` y en la lógica de `js/pedido.js` (versión vanilla).

export function OrderPage() {
  const { items } = useOrder();

  return (
    <section className="order-view-container">
      <h1>Mi Pedido (React)</h1>
      <p>Libros en el pedido: {items.length}</p>

      {/* TODO:
          - Si el pedido está vacío, mostrar el mensaje y el enlace al catálogo.
          - Si tiene libros, mostrar la tabla con una fila por libro:
              * portada, título y autor, precio, cantidad con botones - y +,
                subtotal de la fila y botón para quitar.
          - Mostrar el resumen (se sugiere un componente `OrderSummary`):
              * títulos distintos (X / 4), unidades, subtotal, envío y total.
              * botón "Vaciar Pedido" (con confirmación).
          - Toda la información y las acciones deben salir del OrderContext.
      */}
    </section>
  );
}
