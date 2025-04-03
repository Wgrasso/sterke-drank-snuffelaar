
// Export specific named exports instead of using star exports
export type { Product, ProductFilters, ProductCategory, Store } from './types';
export { 
  fetchProducts, 
  fetchProductById, 
  fetchFeaturedProducts,
  fetchProductsByCategory
} from './services/productService';

// For backward compatibility, re-export the store functions 
// (but import the stores module where you need store data directly)
export { getStoreById, getStoreIdByName } from './stores';
