import { Link } from "react-router-dom";

// Tarjeta de libro del catálogo.
// Debe reflejar, en espíritu, la card de la versión JS vanilla (js/app.js).
//
// MUY IMPORTANTE :
// - Este componente está SOLO esbozado.
// - La estructura y el mapeo de datos reales desde `book`
//   deben ser IMPLEMENTADOS POR EL ALUMNO.

export function BookCard({ book }) {
  // TODO:
  //  - Leer de `book` las propiedades necesarias:
  //      id, title, author, genre, genreVariant, tag, price, cover...
  //  - Construir a partir de esos datos el contenido de la tarjeta.
  //  - Respetar, en lo posible, la información que ya se muestra en la versión JS vanilla.
  //
  // Pista:
  //  - Puedes inspirarte en `js/app.js` (función `renderBooks`) para decidir
  //    qué campos mostrar y cómo organizarlos.

  return (
    <article className="book-card">
      {/* TODO:
          - Reemplazar este bloque por el JSX definitivo de la tarjeta.
          - Debe incluir al menos:
              * Portada, etiqueta (tag) y género (con su variante de color).
              * Título, autor y precio.
              * Enlace a la ruta de detalle "/libros/:id" usando el id del libro.
      */}
    </article>
  );
}
