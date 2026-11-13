/**
 * app.js
 *
 * Renderiza el catálogo de libros en index.html.
 * En tu versión de React, esta lógica se divide en:
 * - <CatalogPage /> (página principal)
 * - <BookCard />    (cada tarjeta de libro)
 * - useBooks()      (custom hook que pide los datos a la API)
 */

const API_URL = "http://localhost:3000/api";
const STORAGE_KEY = "booknest_order";

document.addEventListener("DOMContentLoaded", () => {
  updateOrderBadge();
  fetchBooks();
});

/**
 * Lee el pedido guardado en localStorage.
 * En React: esto lo resuelve el OrderContext (lectura segura con try/catch).
 */
function getStoredOrder() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

/**
 * Actualiza el número del badge de la navbar con el total de UNIDADES.
 * En React: el badge se calcula a partir del estado del contexto.
 */
function updateOrderBadge() {
  const order = getStoredOrder();
  const totalUnits = order.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("order-counter").textContent = totalUnits;
}

/**
 * Pide los libros al backend.
 * En React: se hace dentro de un `useEffect` guardando 'books', 'loading' y 'error' con `useState`.
 */
async function fetchBooks() {
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const gridEl = document.getElementById("books-grid");

  try {
    const response = await fetch(`${API_URL}/libros`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const books = await response.json();
    loadingEl.style.display = "none";
    renderBooks(books, gridEl);
  } catch (error) {
    console.error(error);
    loadingEl.style.display = "none";
    errorEl.style.display = "block";
    errorEl.textContent = `No pudimos cargar el catálogo: ${error.message}. Revisá que el servidor esté corriendo en http://localhost:3000.`;
  }
}

/**
 * Crea una tarjeta por cada libro.
 * En React: se hace con books.map(...) devolviendo <BookCard key={book.id} book={book} />.
 */
function renderBooks(books, gridEl) {
  gridEl.innerHTML = "";

  books.forEach((b) => {
    const card = document.createElement("article");
    card.className = "book-card";

    card.innerHTML = `
      <div class="card-media">
        <span class="book-tag">${b.tag}</span>
        <img src="${b.cover}" alt="${b.title}" class="card-img">
      </div>
      <div class="card-body">
        <span class="card-badge badge-${b.genreVariant || "primary"}">${b.genre}</span>
        <h3 class="card-title">${b.title}</h3>
        <p class="card-author">${b.author}</p>
        <div class="card-footer">
          <span class="price">$${b.price.toLocaleString("es-AR")}</span>
          <a href="libro.html?id=${b.id}" class="btn-detail">Ver Libro</a>
        </div>
      </div>
    `;

    gridEl.appendChild(card);
  });
}
