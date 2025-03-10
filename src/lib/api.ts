
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  store: {
    name: string;
    logo: string;
  };
  discountPercentage?: number;
  category: string;
  volume: string;
  link: string;
}

// Mock store data
const stores = {
  gall: {
    name: 'Gall & Gall',
    logo: 'https://www.gall.nl/medias/sys_master/images/images/h0b/h9c/8879964651550/galogo.svg'
  },
  ah: {
    name: 'Albert Heijn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Albert_Heijn_Logo.svg'
  },
  jumbo: {
    name: 'Jumbo',
    logo: 'https://www.jumbo.com/favicon.ico'
  },
  dirk: {
    name: 'Dirk',
    logo: 'https://www.dirk.nl/assets/images/dirk-logo.svg'
  },
  drankdozijn: {
    name: 'Drankdozijn',
    logo: 'https://www.drankdozijn.nl/static/version1686820612/frontend/Laco/default/nl_NL/images/logo.svg'
  }
};

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Johnnie Walker Black Label',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/6/1/833/248338-big.jpg',
    price: 24.99,
    originalPrice: 32.99,
    store: stores.gall,
    discountPercentage: 24,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.gall.nl'
  },
  {
    id: '2',
    name: 'Absolut Vodka',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/1/7/61/86383-big.jpg',
    price: 16.99,
    originalPrice: 19.99,
    store: stores.ah,
    discountPercentage: 15,
    category: 'Vodka',
    volume: '100cl',
    link: 'https://www.ah.nl'
  },
  {
    id: '3',
    name: 'Bombay Sapphire Gin',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/6/2/902/250508-big.jpg',
    price: 19.99,
    originalPrice: 24.99,
    store: stores.jumbo,
    discountPercentage: 20,
    category: 'Gin',
    volume: '70cl',
    link: 'https://www.jumbo.com'
  },
  {
    id: '4',
    name: 'Bacardi Carta Blanca',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/5/6/736/199999-big.jpg',
    price: 14.99,
    originalPrice: 17.99,
    store: stores.dirk,
    discountPercentage: 17,
    category: 'Rum',
    volume: '70cl',
    link: 'https://www.dirk.nl'
  },
  {
    id: '5',
    name: 'The Glenlivet 12 Years',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/6/5/557/266493-big.jpg',
    price: 34.99,
    originalPrice: 41.99,
    store: stores.drankdozijn,
    discountPercentage: 17,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.drankdozijn.nl'
  },
  {
    id: '6',
    name: 'Jack Daniel\'s Old No. 7',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/4/8/312/149775-big.jpg',
    price: 22.49,
    originalPrice: 27.99,
    store: stores.gall,
    discountPercentage: 20,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.gall.nl'
  },
  {
    id: '7',
    name: 'Grey Goose Vodka',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/2/0/96/89701-big.jpg',
    price: 29.99,
    originalPrice: 36.99,
    store: stores.ah,
    discountPercentage: 19,
    category: 'Vodka',
    volume: '70cl',
    link: 'https://www.ah.nl'
  },
  {
    id: '8',
    name: 'Hendrick\'s Gin',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/6/6/174/269190-big.jpg',
    price: 29.99,
    originalPrice: 34.99,
    store: stores.jumbo,
    discountPercentage: 14,
    category: 'Gin',
    volume: '70cl',
    link: 'https://www.jumbo.com'
  },
  {
    id: '9',
    name: 'Captain Morgan Original Spiced Gold',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/6/1/350/246842-big.jpg',
    price: 17.49,
    originalPrice: 19.99,
    store: stores.dirk,
    discountPercentage: 13,
    category: 'Rum',
    volume: '100cl',
    link: 'https://www.dirk.nl'
  },
  {
    id: '10',
    name: 'Glenfiddich 12 Years',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/3/4/448/124093-big.jpg',
    price: 31.99,
    originalPrice: 38.99,
    store: stores.drankdozijn,
    discountPercentage: 18,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.drankdozijn.nl'
  },
  {
    id: '11',
    name: 'Baileys Original Irish Cream',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/1/5/99/80597-big.jpg',
    price: 13.99,
    originalPrice: 18.99,
    store: stores.ah,
    discountPercentage: 26,
    category: 'Likeur',
    volume: '70cl',
    link: 'https://www.ah.nl'
  },
  {
    id: '12',
    name: 'Ketel One Vodka',
    imageUrl: 'https://static.whiskybase.com/storage/whiskies/2/0/97/89702-big.jpg',
    price: 18.49,
    originalPrice: 21.99,
    store: stores.gall,
    discountPercentage: 16,
    category: 'Vodka',
    volume: '70cl',
    link: 'https://www.gall.nl'
  },
];

export async function fetchProducts(filters?: {
  category?: string;
  search?: string;
  priceRange?: [number, number];
  stores?: string[];
}): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    let filteredProducts = [...mockProducts];
    
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
          const storeId = Object.entries(stores).find(
            ([id, storeData]) => storeData.name === product.store.name
          )?.[0];
          
          return storeId ? filters.stores!.includes(storeId) : false;
        });
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const product = mockProducts.find(p => p.id === id);
    
    if (!product) {
      throw new Error('Product niet gevonden');
    }
    
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    toast.error('Er ging iets mis bij het ophalen van het product.');
    return null;
  }
}

export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    // Sort by discount percentage and take the top ones
    const featuredProducts = [...mockProducts]
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
      .slice(0, limit);
      
    return featuredProducts;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Er ging iets mis bij het ophalen van de aanbevelingen.');
    return [];
  }
}

export async function fetchProductsByCategory(category: string, limit: number = 4): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const categoryProducts = mockProducts
      .filter(p => p.category.toLowerCase() === category.toLowerCase())
      .slice(0, limit);
      
    return categoryProducts;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    toast.error('Er ging iets mis bij het ophalen van de producten.');
    return [];
  }
}
