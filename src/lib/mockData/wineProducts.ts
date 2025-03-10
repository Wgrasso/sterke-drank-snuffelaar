
import { Product } from '../types';
import { stores } from '../stores';

// Wine product data with reliable image URLs
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
  },
  {
    id: 'wine-2',
    name: 'Casillero del Diablo Cabernet Sauvignon',
    imageUrl: '/placeholder.svg',
    price: 7.49,
    originalPrice: 9.99,
    store: stores.ah,
    discountPercentage: 25,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.ah.nl/producten/product/wi475169/casillero-del-diablo-cabernet-sauvignon'
  },
  {
    id: 'wine-3',
    name: 'Cimarosa Pinot Grigio',
    imageUrl: '/placeholder.svg',
    price: 5.99,
    originalPrice: 6.99,
    store: stores.jumbo,
    discountPercentage: 14,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.jumbo.com/producten/cimarosa-pinot-grigio-482544FLS'
  },
  {
    id: 'wine-4',
    name: 'Gallo Family Vineyards Merlot',
    imageUrl: '/placeholder.svg',
    price: 5.49,
    originalPrice: 6.79,
    store: stores.dirk,
    discountPercentage: 19,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.dirk.nl/boodschappen/dranken/wijn/gallo-family-vineyards-merlot/5808'
  },
  {
    id: 'wine-5',
    name: 'Matua Sauvignon Blanc',
    imageUrl: '/placeholder.svg',
    price: 8.99,
    originalPrice: 11.99,
    store: stores.gall,
    discountPercentage: 25,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.gall.nl/p/matua-sauvignon-blanc/'
  },
  {
    id: 'wine-6',
    name: 'Jacob\'s Creek Shiraz Cabernet',
    imageUrl: '/placeholder.svg',
    price: 7.99,
    originalPrice: 9.49,
    store: stores.ah,
    discountPercentage: 16,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.ah.nl/producten/product/wi475429/jacob-s-creek-shiraz-cabernet'
  },
  {
    id: 'wine-7',
    name: 'Torres Viña Sol',
    imageUrl: '/placeholder.svg',
    price: 6.79,
    originalPrice: 8.29,
    store: stores.jumbo,
    discountPercentage: 18,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.jumbo.com/producten/torres-vina-sol-482526FLS'
  },
  {
    id: 'wine-8',
    name: 'Hardys Stamp Chardonnay Semillon',
    imageUrl: '/placeholder.svg',
    price: 5.29,
    originalPrice: 6.49,
    store: stores.dirk,
    discountPercentage: 18,
    category: 'Wijn',
    volume: '75cl',
    link: 'https://www.dirk.nl/boodschappen/dranken/wijn/hardys-stamp-chardonnay-semillon/5812'
  }
];
