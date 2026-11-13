/**
 * libro.js
 *
 * Muestra el detalle de un libro en libro.html (el id llega por la URL: libro.html?id=3)
 * y permite agregarlo al pedido.
 * En tu versión de React:
 * - El id se obtiene con `useParams()` desde la ruta /libros/:id
 * - El agregado al pedido se resuelve con las funciones del OrderContext
 */

const API_URL = "http://localhost:3000/api";
const STORAGE_KEY = "booknest_order";
const MAX_TITLES = 4;

document.addEventListener("DOMContentLoaded", () => {
  updateOrderBadge();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  fetchBookDetail(id);
});

function getStoredOrder() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

function saveOrder(order) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

function updateOrderBadge() {
  const order = getStoredOrder();
  const totalUnits = order.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("order-counter").textContent = totalUnits;
}

/**
 * Pide el libro al backend y completa cada caja del detalle por su id.
 * En React: los datos se muestran directamente en el JSX ({book.title}, {book.author}, etc.)
 */
async function fetchBookDetail(id) {
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const detailEl = document.getElementById("book-detail");

  try {
    const response = await fetch(`${API_URL}/libros/${id}`);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.error || `Error HTTP: ${response.status}`);
    }

    const book = await response.json();
    loadingEl.style.display = "none";

    document.getElementById("detail-cover").src = book.cover;
    document.getElementById("detail-cover").alt = book.title;
    document.getElementById("detail-genre").className = `card-badge badge-${book.genreVariant || "primary"}`;
    document.getElementById("detail-genre").textContent = book.genre;
    document.getElementById("detail-tag").textContent = book.tag;
    document.getElementById("detail-title").textContent = book.title;
    document.getElementById("detail-author").textContent = `de ${book.author}`;
    document.getElementById("detail-price").textContent = `$${book.price.toLocaleString("es-AR")}`;
    document.getElementById("detail-rating").textContent = `★ ${book.rating} / 5`;
    document.getElementById("detail-description").textContent = book.description;
    document.getElementById("detail-stock").textContent = `${book.stock} ejemplares en stock`;
    document.getElementById("detail-pages").textContent = `${book.pages} páginas`;

    // Ficha técnica (objeto): una fila por cada propiedad
    const specsEl = document.getElementById("detail-specs");
    specsEl.innerHTML = "";
    Object.entries(book.specs).forEach(([key, value]) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${key.toUpperCase()}:</strong> <span>${value}</span>`;
      specsEl.appendChild(li);
    });

    // Índice (array): un ítem por capítulo
    const chaptersEl = document.getElementById("detail-chapters");
    chaptersEl.innerHTML = "";
    book.chapters.forEach((chapter, index) => {
      const li = document.createElement("li");
      li.className = "chapter-item";
      li.innerHTML = `<span>${index + 1}.</span><span>${chapter}</span>`;
      chaptersEl.appendChild(li);
    });

    detailEl.style.display = "grid";

    document.getElementById("btn-add-order").addEventListener("click", () => addToOrder(book));
  } catch (error) {
    console.error(error);
    loadingEl.style.display = "none";
    errorEl.style.display = "block";
    errorEl.textContent = `Error: ${error.message}`;
  }
}

/**
 * Reglas de negocio al agregar un libro:
 * - Si ya está en el pedido, se suma 1 a la cantidad (sin superar el stock).
 * - Si es un título nuevo, no se puede superar el máximo de 4 títulos distintos.
 * En React: esta lógica va dentro del OrderContext.
 */
function addToOrder(book) {
  const order = getStoredOrder();
  const existing = order.find((item) => item.id === book.id);

  if (existing) {
    if (existing.quantity >= book.stock) {
      alert("No hay más ejemplares disponibles de este libro.");
      return;
    }
    existing.quantity += 1;
  } else {
    if (order.length >= MAX_TITLES) {
      alert(`Tu pedido ya tiene ${MAX_TITLES} títulos distintos. Quitá uno para agregar otro.`);
      return;
    }
    order.push({ ...book, quantity: 1 });
  }

  saveOrder(order);
  updateOrderBadge();
  alert("¡Libro agregado a tu pedido!");
}
