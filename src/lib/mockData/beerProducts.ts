
import { Product } from '../types';
import { stores } from '../stores';

// Beer product data with consistent placeholder images
export const beerProducts: Product[] = [
  {
    id: 'beer-1',
    name: 'Hertog Jan Pilsener Krat',
    imageUrl: '/placeholder.svg',
    price: 16.99,
    originalPrice: 18.99,
    store: stores.ah,
    discountPercentage: 10,
    category: 'Bier',
    volume: '24x30cl',
    link: 'https://www.ah.nl/producten/product/wi231599/hertog-jan-pilsener-krat'
  }
];
