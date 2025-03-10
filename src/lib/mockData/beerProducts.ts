
import { Product } from '../types';
import { stores } from '../stores';

// Beer product data with reliable image URLs
export const beerProducts: Product[] = [
  {
    id: 'beer-1',
    name: 'Hertog Jan Pilsener Krat',
    imageUrl: '/placeholder.svg',
    price: 16.99,
    originalPrice: 18.99,
    store: stores.ah,
    discountPercentage: 11,
    category: 'Bier',
    volume: '24x30cl',
    link: 'https://www.ah.nl/producten/product/wi231599/hertog-jan-pilsener-krat'
  },
  {
    id: 'beer-2',
    name: 'Grolsch Premium Pilsner Krat',
    imageUrl: '/placeholder.svg',
    price: 17.49,
    originalPrice: 19.29,
    store: stores.jumbo,
    discountPercentage: 9,
    category: 'Bier',
    volume: '24x30cl',
    link: 'https://www.jumbo.com/producten/grolsch-premium-pilsner-krat-479768KT'
  },
  {
    id: 'beer-3',
    name: 'Brand Pilsener Krat',
    imageUrl: '/placeholder.svg',
    price: 15.99,
    originalPrice: 17.99,
    store: stores.dirk,
    discountPercentage: 11,
    category: 'Bier',
    volume: '24x30cl',
    link: 'https://www.dirk.nl/boodschappen/dranken/bier-en-cider/brand-pilsener/5737'
  },
  {
    id: 'beer-4',
    name: 'Heineken Pilsener Krat',
    imageUrl: '/placeholder.svg',
    price: 16.79,
    originalPrice: 18.49,
    store: stores.gall,
    discountPercentage: 9,
    category: 'Bier',
    volume: '24x30cl',
    link: 'https://www.gall.nl/p/heineken-pilsener-krat-30cl/'
  },
  {
    id: 'beer-5',
    name: 'La Chouffe Blond Speciaalbier',
    imageUrl: '/placeholder.svg',
    price: 1.99,
    originalPrice: 2.39,
    store: stores.ah,
    discountPercentage: 17,
    category: 'Bier',
    volume: '33cl',
    link: 'https://www.ah.nl/producten/product/wi128098/la-chouffe-blond-speciaalbier'
  },
  {
    id: 'beer-6',
    name: 'Tripel Karmeliet Speciaalbier',
    imageUrl: '/placeholder.svg',
    price: 2.49,
    originalPrice: 2.89,
    store: stores.jumbo,
    discountPercentage: 14,
    category: 'Bier',
    volume: '33cl',
    link: 'https://www.jumbo.com/producten/tripel-karmeliet-speciaalbier-33-479895FLS'
  },
  {
    id: 'beer-7',
    name: 'Leffe Blond Abdijbier',
    imageUrl: '/placeholder.svg',
    price: 1.79,
    originalPrice: 1.99,
    store: stores.dirk,
    discountPercentage: 10,
    category: 'Bier',
    volume: '30cl',
    link: 'https://www.dirk.nl/boodschappen/dranken/bier-en-cider/leffe-blond/5761'
  },
  {
    id: 'beer-8',
    name: 'Duvel Speciaalbier',
    imageUrl: '/placeholder.svg',
    price: 2.29,
    originalPrice: 2.69,
    store: stores.gall,
    discountPercentage: 15,
    category: 'Bier',
    volume: '33cl',
    link: 'https://www.gall.nl/p/duvel-33cl/'
  }
];
