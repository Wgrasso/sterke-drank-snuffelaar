
import { Product } from '../types';
import { stores } from '../stores';

// Wine product data with consistent placeholder images
export const wineProducts: Product[] = [
  {
    id: 'wine-1',
    name: 'Las Moras Malbec',
    imageUrl: '/placeholder.svg',
    price: 6.99,
    originalPrice: 8.99,
    store: stores.gall,
    discountPercentage: 22,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.gall.nl/p/las-moras-malbec/'
  }
];
