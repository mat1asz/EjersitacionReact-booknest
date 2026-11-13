import { Layout } from "./components/Layout.jsx";
import { CatalogPage } from "./pages/CatalogPage.jsx";
import { BookDetailPage } from "./pages/BookDetailPage.jsx";
import { OrderPage } from "./pages/OrderPage.jsx";

// Componente raíz de la SPA.
// AQUÍ debes definir las rutas principales usando React Router.
export default function App() {
  return (
    <Layout>
        {/*
          Ejemplo :

          // 1) Ruta principal del catálogo:
          //    - path: "/"
          //    - componente: CatalogPage
          //
          // 2) Ruta de detalle de un libro:
          //    - path: "/libros/:id"
          //    - componente: BookDetailPage
          //
          // 3) Ruta de la página del pedido:
          //    - path: "/pedido"
          //    - componente: OrderPage
          //
          // 4) Ruta comodín para 404:
          //    - path: "*"
          //    - componente: página de "no encontrado" (debes crearla)

          Sustituye este comentario por tu propia configuración de rutas.
        */}
    </Layout>
  );
}
