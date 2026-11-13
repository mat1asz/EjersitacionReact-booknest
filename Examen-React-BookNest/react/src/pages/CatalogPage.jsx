import { useBooks } from "../hooks/useBooks.js";
import { BookCard } from "../components/BookCard.jsx";

// Página principal: hero + catálogo de libros + club de lectura.
// Inspírate en index.html y en la lógica de js/app.js (versión vanilla).

export function CatalogPage() {
  const { books, loading, error } = useBooks();

  return (
    <section className="catalog-section">
      <h1>Catálogo de libros</h1>
      <p>
        Reimplementación en React de la librería BookNest. Los datos provienen de
        la API Express.
      </p>

      {/* TODO:
          - Agregar el hero y la sección "Club de Lectura" de index.html
            (se sugiere un componente `HeroBanner`).
          - Mostrar el estado de carga y el de error (ver js/app.js).
          - Renderizar la grilla de libros usando el componente BookCard.
      */}
      <div className="books-grid">

      </div>
    </section>
  );
}
