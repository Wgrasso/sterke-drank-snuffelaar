
import { toast } from "sonner";
import { Product, ProductFilters } from '../types';
import { liquorProducts } from '../mockData/liquorProducts';
import { beerProducts } from '../mockData/beerProducts';
import { wineProducts } from '../mockData/wineProducts';
import { getStoreIdByName } from '../stores';

// Combine all product data
const allProducts: Product[] = [
  ...liquorProducts,
  ...beerProducts,
  ...wineProducts
];

// Simulate API delay
const simulateApiDelay = async (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to validate product image URLs
const validateImageUrl = (imageUrl: string): string => {
  // Use a local placeholder if the URL is suspicious or likely to cause errors
  if (!imageUrl || 
      !imageUrl.startsWith('http') || 
      imageUrl.includes('example.com') ||
      imageUrl.includes('whiskybase.com')) {
    return "/placeholder.svg";
  }
  return imageUrl;
};

export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  // Simulate API delay
  await simulateApiDelay();
  
  try {
    // Create a modified copy with validated image URLs
    const validatedProducts = allProducts.map(product => ({
      ...product,
      imageUrl: validateImageUrl(product.imageUrl)
    }));
    
    let filteredProducts = [...validatedProducts];
    
    if (filters) {
      // Filter by category
      if (filters.category) {
        filteredProducts = filteredProducts.filter(
          product => product.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }
      
      // Filter by search
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          product => product.name.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filter by price range
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(
          product => product.price >= filters.priceRange![0] && product.price <= filters.priceRange![1]
        );
      }
      
      // Filter by stores
      if (filters.stores && filters.stores.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          const storeId = getStoreIdByName(product.store.name);
          return storeId ? filters.stores!.includes(storeId) : false;
        });
      }

      // Filter by validation status
      if (filters.onlyValidated) {
        // Voor demo-doeleinden zullen we willekeurig producten filteren
        filteredProducts = filteredProducts.filter(
          () => Math.random() > 0.3 // 70% kans om opgenomen te worden
        );
      }

      // Filter by discount
      if (filters.onlyDiscounted) {
        filteredProducts = filteredProducts.filter(
          product => product.originalPrice && product.price < product.originalPrice
        );
      }
    }
    
    return filteredProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Er ging iets mis bij het ophalen van de producten.');
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await simulateApiDelay();
  
  try {
    const product = allProducts.find(p => p.id === id);
    
    if (!product) {
      throw new Error('Product niet gevonden');
    }
    
    // Validate image URL before returning
    return {
      ...product,
      imageUrl: validateImageUrl(product.imageUrl)
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    toast.error('Er ging iets mis bij het ophalen van het product.');
    return null;
  }
}

export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  await simulateApiDelay(300);
  
  try {
    // Sort by discount percentage and take the top ones
    const featuredProducts = [...allProducts]
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
      .slice(0, limit)
      .map(product => ({
        ...product,
        imageUrl: validateImageUrl(product.imageUrl)
      }));
      
    return featuredProducts;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Er ging iets mis bij het ophalen van de aanbevelingen.');
    return [];
  }
}

export async function fetchProductsByCategory(category: string, limit: number = 4): Promise<Product[]> {
  await simulateApiDelay(300);
  
  try {
    const categoryProducts = allProducts
      .filter(p => p.category.toLowerCase() === category.toLowerCase())
      .slice(0, limit)
      .map(product => ({
        ...product,
        imageUrl: validateImageUrl(product.imageUrl)
      }));
      
    return categoryProducts;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    toast.error('Er ging iets mis bij het ophalen van de producten.');
    return [];
  }
}
