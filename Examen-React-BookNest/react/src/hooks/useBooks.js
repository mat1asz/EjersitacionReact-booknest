import { useEffect, useState } from "react";

// Custom hook para cargar los libros desde la API.
//
// MUY IMPORTANTE :
// - Aquí solo se define la **estructura básica** del hook.
// - La lógica real de llamada a la API, manejo de errores y estados
//   debe ser IMPLEMENTADA POR EL ALUMNO.

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO:
    // - Usar aquí `apiFetch` (u otra función que implementes) para llamar a
    //   GET /api/libros.
    // - Actualizar `loading`, `error` y `books` según el resultado.
    //
    // Pista:
    // - El formato esperado de `books` es un array:
    //   [ { id: 1, title: "...", author: "...", price: 28500, stock: 5, ... }, ... ]
  }, []);

  // Devolvemos el contrato que usarán las páginas/componentes.
  return {
    books,
    loading,
    error,
  };
}
