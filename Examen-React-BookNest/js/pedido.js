/**
 * pedido.js
 *
 * Muestra el pedido guardado en localStorage (pedido.html):
 * tabla con cantidades (+ / -), quitar, vaciar y el resumen con el envío.
 * En tu versión de React:
 * - <OrderPage />    (la página /pedido)
 * - <OrderSummary /> (el resumen de totales)
 * - Todo el estado sale del OrderContext (useOrder)
 */

const STORAGE_KEY = "booknest_order";
const MAX_TITLES = 4;
const FREE_SHIPPING_FROM = 50000;
const SHIPPING_COST = 3900;

document.addEventListener("DOMContentLoaded", () => {
  renderOrder();

  document.getElementById("btn-empty-order").addEventListener("click", () => {
    if (confirm("¿Querés vaciar todo tu pedido?")) {
      saveOrder([]);
      renderOrder();
    }
  });
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

function updateOrderBadge(order) {
  const totalUnits = order.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("order-counter").textContent = totalUnits;
}

/**
 * Dibuja la tabla y el resumen.
 * En React: las filas se arman con order.map(...) y los totales se calculan del estado.
 */
function renderOrder() {
  const order = getStoredOrder();
  const emptyEl = document.getElementById("order-empty");
  const contentEl = document.getElementById("order-content");
  const tbody = document.getElementById("order-items-body");

  updateOrderBadge(order);

  if (order.length === 0) {
    emptyEl.style.display = "block";
    contentEl.style.display = "none";
    return;
  }

  emptyEl.style.display = "none";
  contentEl.style.display = "block";
  tbody.innerHTML = "";

  order.forEach((item) => {
    const itemSubtotal = item.price * item.quantity;
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td style="display: flex; align-items: center; gap: 12px;">
        <img src="${item.cover}" alt="${item.title}" style="width: 44px; height: 64px; object-fit: cover; border-radius: 4px;">
        <div>
          <div style="font-weight: 600;">${item.title}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${item.author}</div>
        </div>
      </td>
      <td>$${item.price.toLocaleString("es-AR")}</td>
      <td>
        <div class="quantity-controls">
          <button class="btn-qty btn-minus" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
        </div>
      </td>
      <td style="font-weight: 600;">$${itemSubtotal.toLocaleString("es-AR")}</td>
      <td>
        <button class="btn-remove-item" data-id="${item.id}" title="Quitar del pedido">🗑️</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Totales
  const totalUnits = order.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  document.getElementById("summary-titles").textContent = order.length;
  document.getElementById("summary-units").textContent = totalUnits;
  document.getElementById("summary-subtotal").textContent = `$${subtotal.toLocaleString("es-AR")}`;
  document.getElementById("summary-shipping").textContent = shipping === 0 ? "Gratis" : `$${shipping.toLocaleString("es-AR")}`;
  document.getElementById("summary-shipping").style.color = shipping === 0 ? "var(--success-color)" : "var(--text-main)";
  document.getElementById("summary-total").textContent = `$${total.toLocaleString("es-AR")}`;

  // Eventos de los botones de cada fila
  document.querySelectorAll(".btn-minus").forEach((btn) => {
    btn.addEventListener("click", () => changeQuantity(Number(btn.dataset.id), -1));
  });
  document.querySelectorAll(".btn-plus").forEach((btn) => {
    btn.addEventListener("click", () => changeQuantity(Number(btn.dataset.id), 1));
  });
  document.querySelectorAll(".btn-remove-item").forEach((btn) => {
    btn.addEventListener("click", () => removeFromOrder(Number(btn.dataset.id)));
  });
}

/**
 * + suma 1 sin superar el stock. - resta 1 y, si la cantidad llega a 0, el libro se quita.
 */
function changeQuantity(id, delta) {
  const order = getStoredOrder();
  const item = order.find((i) => i.id === id);
  if (!item) return;

  if (delta > 0 && item.quantity >= item.stock) {
    alert("No hay más ejemplares disponibles de este libro.");
    return;
  }

  item.quantity += delta;
  const updated = order.filter((i) => i.quantity > 0);
  saveOrder(updated);
  renderOrder();
}

function removeFromOrder(id) {
  const order = getStoredOrder().filter((i) => i.id !== id);
  saveOrder(order);
  renderOrder();
}
