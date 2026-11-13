import { useContext } from "react";
import { OrderContext } from "../context/OrderContext.jsx";

// Custom hook para consumir el contexto del pedido.
// Esto simplifica su uso en el resto de la aplicación.

export function useOrder() {
  const ctx = useContext(OrderContext);

  if (!ctx) {
    // Este error ayuda a detectar si se usa el hook fuera del OrderProvider.
    throw new Error("useOrder debe usarse dentro de un <OrderProvider>");
  }

  return ctx;
}
