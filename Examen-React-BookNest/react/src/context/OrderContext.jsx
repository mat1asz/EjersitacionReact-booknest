import { createContext, useState, useEffect } from "react";

// Contexto del pedido ("Mi Pedido").
//
// MUY IMPORTANTE :
// - Aquí se deja solo la estructura mínima del contexto.
// - La lógica real de:
//    * restaurar el pedido desde localStorage ('booknest_order') de forma segura,
//    * guardar el pedido cada vez que cambia,
//    * agregar un libro respetando las reglas (stock y máximo de 4 títulos distintos),
//    * incrementar / decrementar cantidades, quitar un libro y vaciar el pedido,
//    * calcular el total de unidades (badge), el subtotal, el envío y el total,
//   debe ser IMPLEMENTADA POR EL ALUMNO.
//
// Pista:
// - Inspírate en `js/libro.js` y `js/pedido.js` de la versión vanilla.
// - Respeta la clave de localStorage usada allí ('booknest_order').
// - Las reglas de negocio están en el README (sección 4).

export const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // TODO:
    // - Leer de localStorage el pedido guardado.
    // - Si el contenido está corrupto, la app no debe romperse (arrancar vacío).
  }, []);

  const addToOrder = (book) => {
    // TODO:
    // - Si el libro ya está, sumar 1 a su cantidad sin superar el stock.
    // - Si es nuevo, no superar el máximo de 4 títulos distintos.
    console.warn("TODO: implementar addToOrder en OrderContext");
  };

  const increaseQuantity = (id) => {
    // TODO: sumar 1 a la cantidad (sin superar el stock).
    console.warn("TODO: implementar increaseQuantity en OrderContext");
  };

  const decreaseQuantity = (id) => {
    // TODO: restar 1 a la cantidad. Si era 1, quitar el libro del pedido.
    console.warn("TODO: implementar decreaseQuantity en OrderContext");
  };

  const removeFromOrder = (id) => {
    // TODO: quitar el libro completo del pedido.
    console.warn("TODO: implementar removeFromOrder en OrderContext");
  };

  const clearOrder = () => {
    // TODO: vaciar el pedido.
    console.warn("TODO: implementar clearOrder en OrderContext");
  };

  const value = {
    items,
    addToOrder,
    increaseQuantity,
    decreaseQuantity,
    removeFromOrder,
    clearOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
