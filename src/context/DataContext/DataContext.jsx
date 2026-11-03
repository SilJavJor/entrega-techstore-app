/* ==========================================================================
  Componente DataContext.jsx
  Descripción: Proveedor Maestro que agrupa los sub-contextos independientes.
    ProductProvider - CategoryProvider - TeamProvider - FavoritesProvider
  Autor: Silvio Jorda
  Fecha: 2026-09-30
========================================================================== */

// Importaciones
import { TeamsProvider } from '../Teams/TeamsContext';
import { BrandsProvider } from '../Brands/BrandsContext';
import { ProductsProvider } from '../Products/ProductsContext';
import { CategoriesProvider } from '../Categories/CategoriesContext';
import { FavoritesProvider } from '../Favorites/FavoritesContext';
import { CartProvider } from '../Cart/CartContext';

export function DataProvider({ children }) {
  return (
   <TeamsProvider>
     <BrandsProvider>
      <CategoriesProvider>
        <ProductsProvider>
          <FavoritesProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </FavoritesProvider>
        </ProductsProvider>
      </CategoriesProvider>
    </BrandsProvider>
  </TeamsProvider>
  );
};