## Examen Práctico - React BookNest

**Objetivo general**
Migrar la librería online **BookNest** (hecha en HTML + CSS + JavaScript vanilla) a una **SPA en React**, consumiendo la **API Express** provista y manteniendo el pedido del usuario con **Context API + localStorage**.

---

### 1. Qué hay en el repo

- **Versión referencia (NO tocar)**: `index.html`, `libro.html`, `pedido.html`, `css/`, `js/`, `data/`.
- **API Express (NO tocar)**: carpeta `server/`, base URL `http://localhost:3000/api`.
- **Proyecto React**: carpeta `react/`, creado con Vite. Ya trae `react-router-dom`, la hoja de estilos (`src/index.css`), las fuentes en `index.html` y un **esqueleto** de archivos con comentarios `TODO`.

Tu trabajo es completar la versión en React tomando como modelo la versión vanilla.

---

### 2. Endpoints disponibles

| Método | Endpoint | Respuesta |
|---|---|---|
| GET | `/api/libros` | Lista completa de libros (array) |
| GET | `/api/libros/:id` | Un libro por id. Si no existe: `404` con `{ "error": "Libro no encontrado" }` |

> El servidor tiene una demora simulada de 500 ms para que puedas ver el estado de carga.

---

### 3. Qué debe tener tu app React

- **Routing (React Router)**
  - `/` → Catálogo de libros (`CatalogPage`).
  - `/libros/:id` → Detalle de un libro (`BookDetailPage`).
  - `/pedido` → Mi Pedido (`OrderPage`).
  - `*` → Página 404 con un link para volver al inicio.
  - La navegación entre páginas **no debe recargar** el navegador.

- **Consumo de API (fetch desde React)**
  - El catálogo consume `GET /api/libros` y el detalle `GET /api/libros/:id`.
  - Manejar los tres estados: **cargando**, **datos** y **error** (incluido un id que no existe).

- **Característica especial: Mi Pedido**
  - Crear un `OrderContext` con su `OrderProvider` que administre el pedido para toda la app.
  - Desde el detalle se agrega el libro al pedido con el botón **"Agregar al Pedido"**.
  - La navbar muestra un **badge** con el total de unidades del pedido, siempre actualizado.
  - La página `/pedido` muestra la tabla del pedido y el resumen con los totales.
  - El pedido debe **persistir en localStorage** con la clave `booknest_order`.

---

### 4. Reglas de negocio del pedido

1. Al agregar un libro que **ya está** en el pedido, se incrementa su cantidad en 1.
2. La cantidad de un libro **no puede superar su `stock`** (tanto desde el detalle como con el botón **+**).
3. El pedido admite como **máximo 4 títulos distintos**. Si se intenta agregar un 5.º título, se avisa al usuario y no se agrega.
4. En la tabla, el botón **−** resta 1. Si la cantidad era 1, el libro se **elimina** del pedido (nunca queda en 0 ni negativo).
5. El botón 🗑️ quita el libro completo y **Vaciar Pedido** borra todo (pidiendo confirmación).
6. **Subtotal** = suma de `price × quantity` de cada libro.
7. **Envío**: **gratis** si el subtotal es **mayor o igual a $50.000**; si es menor, cuesta **$3.900**. Con el pedido vacío, el envío y el total son **$0**.
8. **Total** = subtotal + envío.
9. El resumen muestra también la cantidad de títulos distintos (`X / 4`) y el total de unidades.
10. Si el contenido guardado en localStorage está corrupto (no es un JSON válido), la app **no debe romperse**: arranca con el pedido vacío.

> Los avisos (stock alcanzado, máximo de títulos, libro agregado) pueden mostrarse con `alert()` o con un mensaje en la interfaz.

---

### 5. React: piezas mínimas

- **Hooks**: `useState`, `useEffect`, `useContext`, `useParams`.
- **Custom hooks**: `useBooks` (datos del catálogo) y `useOrder` (consumo del contexto).
- **Context**: `OrderContext` con el pedido, sus acciones y los totales calculados.
- **Componentes sugeridos**: `Layout`, `Navbar`, `BookCard`, `OrderSummary`, `HeroBanner`, `ChapterList`, `Loading`, `ErrorMessage`.
- **Estructura**: `components/`, `pages/`, `hooks/`, `context/`, `api/`.

---

### 6. Cómo ejecutar todo

1. **API Express**: desde la carpeta `server/` → `npm install` y después `npm run dev` (o `npm start`).
   La versión vanilla de referencia queda disponible en `http://localhost:3000`.
2. **App React**: desde la carpeta `react/` → `npm install` y después `npm run dev`.
   Abrí `http://localhost:5173`.

---

### 7. Reglas básicas del examen

- **No modificar** la versión vanilla ni la API Express provista (todo lo que está fuera de `react/`).
- **No importar** el archivo `data/libros.json` desde React: los datos se piden al servidor.
- **No manipular el DOM** a mano (`getElementById`, `querySelector`, `innerHTML`…) dentro de React.
- **Sí podés** crear dentro de `react/src` todos los componentes, hooks y archivos que necesites.
- Hacé commits frecuentes y subí tu trabajo al repositorio antes de que termine el tiempo del examen.

Para ver **cómo se puntúa** el examen, consultá `rubricas.md`.
