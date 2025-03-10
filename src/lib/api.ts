
// Re-export all API-related modules
export * from './types';
export * from './services/productService';

// For backward compatibility, re-export the store functions 
// (but import the stores module where you need store data directly)
export { getStoreById, getStoreIdByName } from './stores';
