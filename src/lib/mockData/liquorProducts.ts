
import { Product } from '../types';
import { stores } from '../stores';

// Mock liquor product data with reliable image URLs
export const liquorProducts: Product[] = [
  {
    id: '1',
    name: 'Johnnie Walker Black Label',
    imageUrl: '/placeholder.svg',
    price: 24.99,
    originalPrice: 32.99,
    store: stores.gall,
    discountPercentage: 24,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.gall.nl/p/johnnie-walker-black-label/'
  }
];
