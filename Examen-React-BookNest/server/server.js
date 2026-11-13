const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta al archivo de datos
const librosPath = path.join(__dirname, "..", "data", "libros.json");

// Simula la latencia de una API real (para poder ver el estado de "cargando")
const DELAY_MS = 500;

function leerLibros(callback) {
  fs.readFile(librosPath, "utf-8", (err, data) => {
    if (err) return callback(err);
    try {
      callback(null, JSON.parse(data));
    } catch (parseErr) {
      callback(parseErr);
    }
  });
}

// --- Endpoints de datos ---

// Todos los libros (estructura igual a libros.json)
app.get("/api/libros", (req, res) => {
  leerLibros((err, libros) => {
    if (err) {
      console.error("Error leyendo libros.json", err);
      return res.status(500).json({ error: "Error interno al leer los libros" });
    }

    setTimeout(() => res.json(libros), DELAY_MS);
  });
});

// Libro por id
app.get("/api/libros/:id", (req, res) => {
  leerLibros((err, libros) => {
    if (err) {
      console.error("Error leyendo libros.json", err);
      return res.status(500).json({ error: "Error interno al leer los libros" });
    }

    const id = parseInt(req.params.id, 10);
    const libro = libros.find((l) => l.id === id);

    setTimeout(() => {
      if (!libro) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      res.json(libro);
    }, DELAY_MS);
  });
});

// --- Servir la versión vanilla (referencia) desde la raíz del proyecto ---
app.use(express.static(path.join(__dirname, "..")));

app.listen(PORT, () => {
  console.log(`Servidor mock de BookNest escuchando en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api/libros`);
});
