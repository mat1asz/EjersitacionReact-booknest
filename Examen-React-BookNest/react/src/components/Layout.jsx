import { Link } from "react-router-dom";

// Layout principal de la app.
// Incluye la barra de navegación (header), el contenido de cada página y el pie de página.
//
// MUY IMPORTANTE :
// - La navbar está SOLO maquetada: los enlaces y el badge del pedido
//   deben ser IMPLEMENTADOS POR EL ALUMNO.
// - Se recomienda extraer el header a su propio componente (`Navbar`).

export function Layout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="store-container">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">
            Book<span className="logo-highlight">Nest</span>
          </span>
        </div>

        <nav className="nav-links">
          {/* TODO:
              - Agregar los enlaces de navegación de la versión vanilla (index.html):
                  * "Catálogo" → ruta "/"
                  * "Club de Lectura" → sección #club del catálogo
              - Usar los componentes de React Router (Link / NavLink) en lugar de <a href>.
          */}
        </nav>

        <div className="nav-actions">
          {/* TODO:
              - Convertir este bloque en un enlace a la ruta "/pedido".
              - El número del badge debe mostrar el total de UNIDADES del pedido,
                obtenido desde el OrderContext (no puede quedar fijo en 0).
          */}
          <span className="btn-order">
            🛒 Mi Pedido <span id="order-counter" className="order-badge">0</span>
          </span>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <hr className="footer-divider" />
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">📚</span>
            <span className="footer-logo-text">BookNest Librería</span>
          </div>
          <p className="footer-copy">
            © {currentYear} BookNest - Examen de Migración a React
          </p>
        </div>
      </footer>
    </div>
  );
}
