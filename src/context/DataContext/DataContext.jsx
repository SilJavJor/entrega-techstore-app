/* ==========================================================================
  Componente DataContext.jsx
  Descripción: Proveedor Maestro que agrupa los sub-contextos independientes.
    ProductProvider - CategoryProvider - TeamProvider - FavoritesProvider
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
//import { BrandsProvider } from '../Brands/BrandsContext';
import { ProductsProvider } from '../Products/ProductsContext';
import { CategoriesProvider } from '../Categories/CategoriesContext';
import { TeamsProvider } from '../Teams/TeamsContext';
import { FavoritesProvider } from '../Favorites/FavoritesContext';
import { CartProvider } from '../CartContext/CartContext';

export function DataProvider({ children }) {
  return (
    <ProductsProvider>
      <CategoriesProvider>
        <FavoritesProvider>
          <TeamsProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </TeamsProvider>
        </FavoritesProvider>
      </CategoriesProvider>
    </ProductsProvider>
  );
};