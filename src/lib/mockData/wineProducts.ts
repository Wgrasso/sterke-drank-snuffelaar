
import { Product } from '../types';
import { stores } from '../stores';

// Wine product data with real product information from drankdozijn.nl
export const wineProducts: Product[] = [
  {
    id: 'wine-1',
    name: 'Bombay Sapphire Gin',
    imageUrl: 'https://static.drankdozijn.nl/products/17000/original/bombay-sapphire-london-dry-gin-1-liter_1.png',
    price: 29.99,
    originalPrice: 36.99,
    store: stores.drankdozijn,
    discountPercentage: 19,
    category: 'Gin',
    volume: '100cl',
    link: 'https://drankdozijn.nl/artikel/fles-bombay-sapphire-gin-1ltr'
  }
];
