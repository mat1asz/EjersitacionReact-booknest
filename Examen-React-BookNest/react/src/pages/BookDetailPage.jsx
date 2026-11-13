import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Página de detalle de un libro.
//
// MUY IMPORTANTE :
// - Aquí solo se deja la estructura de estados y el esqueleto visual.
// - Toda la lógica de:
//    * Llamar a la API para obtener el detalle (`/api/libros/:id`),
//    * Manejar estados de carga, error y libro no encontrado,
//    * Agregar el libro al pedido usando el OrderContext,
//   debe ser IMPLEMENTADA POR EL ALUMNO.
//
// Pista:
// - Inspírate en `libro.html` y `js/libro.js` de la versión vanilla.

export function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO:
    // - Usar aquí tu helper de API para obtener el libro por id.
    // - Actualizar `book`, `loading` y `error` según corresponda.
    console.warn("TODO: implementar carga de detalle de libro en BookDetailPage");
  }, [id]);

  return (
    <section className="detail-view-container">
      <h1>Detalle de libro (React)</h1>
      <p>
        Página de detalle para el libro con id: <strong>{id}</strong>
      </p>

      {/* TODO:
          - Sustituir este bloque por una versión completa que muestre:
            * Botón para volver al catálogo.
            * Portada, género, etiqueta, título y autor.
            * Precio, valoración, descripción, stock y cantidad de páginas.
            * Ficha técnica (objeto `specs`).
            * Índice de contenidos (array `chapters`, se sugiere un componente `ChapterList`).
            * Botón "Agregar al Pedido" conectado al OrderContext.
          - Manejar visualmente los casos de:
            * loading === true
            * error !== null
            * book === null (libro no encontrado)
      */}

      <pre
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "rgba(0,0,0,0.4)",
        }}
      >
        <code>
          {`// Ejemplo de estructura de datos esperada (simplificada):
// {
//   "id": 1,
//   "title": "El Nombre del Viento",
//   "author": "Patrick Rothfuss",
//   "genre": "Fantasía",
//   "genreVariant": "primary",
//   "tag": "Bestseller",
//   "price": 28500,
//   "stock": 5,
//   "rating": 4.8,
//   "pages": 880,
//   "cover": "https://...",
//   "description": "...",
//   "specs": { "editorial": "...", "idioma": "...", ... },
//   "chapters": ["...", "..."]
// }`}
        </code>
      </pre>
    </section>
  );
}
