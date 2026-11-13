## Rúbrica - Examen React BookNest

Puntaje total: **100 puntos**. Se aprueba con **60 puntos**, siempre que no se cumpla ninguna condición de desaprobación automática.

---

### 1. Routing y SPA (20 pts)
- Rutas configuradas con React Router: `/`, `/libros/:id`, `/pedido` y `*` (5 pts).
- Navegación con `Link` / `NavLink` en tarjetas, navbar y botones de volver, **sin recargar** la página (6 pts).
- Uso de `useParams` para obtener el id del libro en el detalle (4 pts).
- Página 404 con un link para volver al inicio (5 pts).

---

### 2. Consumo de API y estado (20 pts)
- `fetch` a `GET /api/libros` y `GET /api/libros/:id` usando la base URL centralizada en `src/api/client.js` (6 pts).
- `useEffect` con las dependencias correctas (el detalle se vuelve a pedir si cambia el `id`) (6 pts).
- Manejo de los tres estados: **cargando**, **datos** y **error** (incluido un id inexistente y el servidor apagado) (8 pts).

---

### 3. Páginas y componentes (20 pts)
- Modularización: la UI separada en componentes reutilizables (`Navbar`, `BookCard`, `OrderSummary`, `HeroBanner`, `ChapterList`…) (8 pts).
- Fidelidad visual con la versión vanilla, reutilizando las clases de `index.css` mediante `className` (6 pts).
- Renderizado de listas con `.map()` y `key`, y renderizado condicional (pedido vacío / con libros, envío gratis / con costo) (6 pts).

---

### 4. Característica especial: Mi Pedido con Context (25 pts)
- `OrderContext` + `OrderProvider` envolviendo la app; las páginas consumen el contexto con `useOrder` (8 pts).
- Reglas de negocio del README: incremento de cantidad, tope de stock, máximo de 4 títulos, − en 1 elimina, quitar, vaciar con confirmación, subtotal, envío, total y **badge** con el total de unidades (9 pts).
- Persistencia en localStorage con la clave `booknest_order`: se recupera al recargar (F5) y una lectura corrupta no rompe la app (8 pts).

---

### 5. Custom hooks y calidad de código (15 pts)
- Custom hooks propios: `useBooks` para los datos del catálogo y `useOrder` para el contexto (8 pts).
- Código limpio y legible: nombres claros, sin código muerto ni `console.log` de prueba (5 pts).
- Sin manipulación directa del DOM (`getElementById`, `querySelector`, `innerHTML`) (2 pts).

---

### 6. Desaprobación automática
- La app no compila o la consola muestra errores fatales al ejecutar `npm run dev`.
- La navegación recarga la página (uso de `<a href="...">` para moverse entre páginas de la SPA).
- Los datos se importan desde `data/libros.json` en lugar de pedirse al servidor.
- Uso de `getElementById`, `querySelector` o `innerHTML` para construir la interfaz en React.
- Modificar los archivos de la versión vanilla o de la API (todo lo que está fuera de `react/`).
