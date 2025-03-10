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
  },
  {
    id: '2',
    name: 'Absolut Vodka',
    imageUrl: '/placeholder.svg',
    price: 16.99,
    originalPrice: 19.99,
    store: stores.ah,
    discountPercentage: 15,
    category: 'Vodka',
    volume: '100cl',
    link: 'https://www.ah.nl/producten/product/wi171843/absolut-vodka'
  },
  {
    id: '3',
    name: 'Bombay Sapphire Gin',
    imageUrl: '/placeholder.svg',
    price: 19.99,
    originalPrice: 24.99,
    store: stores.jumbo,
    discountPercentage: 20,
    category: 'Gin',
    volume: '70cl',
    link: 'https://www.jumbo.com/producten/bombay-sapphire-gin-482380FLS'
  },
  {
    id: '4',
    name: 'Bacardi Carta Blanca',
    imageUrl: '/placeholder.svg',
    price: 14.99,
    originalPrice: 17.99,
    store: stores.dirk,
    discountPercentage: 17,
    category: 'Rum',
    volume: '70cl',
    link: 'https://www.dirk.nl/boodschappen/dranken/sterke-drank/bacardi-carta-blanca/5731'
  },
  {
    id: '5',
    name: 'The Glenlivet 12 Years',
    imageUrl: '/placeholder.svg',
    price: 34.99,
    originalPrice: 41.99,
    store: stores.drankdozijn,
    discountPercentage: 17,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.drankdozijn.nl/artikel/fles-glenlivet-12-jaar-70cl'
  },
  {
    id: '6',
    name: 'Jack Daniel\'s Old No. 7',
    imageUrl: '/placeholder.svg',
    price: 22.49,
    originalPrice: 27.99,
    store: stores.gall,
    discountPercentage: 20,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.gall.nl/p/jack-daniels-old-no-7/'
  },
  {
    id: '7',
    name: 'Grey Goose Vodka',
    imageUrl: '/placeholder.svg',
    price: 29.99,
    originalPrice: 36.99,
    store: stores.ah,
    discountPercentage: 19,
    category: 'Vodka',
    volume: '70cl',
    link: 'https://www.ah.nl/producten/product/wi175290/grey-goose-vodka'
  },
  {
    id: '8',
    name: 'Hendrick\'s Gin',
    imageUrl: '/placeholder.svg',
    price: 29.99,
    originalPrice: 34.99,
    store: stores.jumbo,
    discountPercentage: 14,
    category: 'Gin',
    volume: '70cl',
    link: 'https://www.jumbo.com/producten/hendricks-gin-482378FLS'
  },
  {
    id: '9',
    name: 'Captain Morgan Original Spiced Gold',
    imageUrl: '/placeholder.svg',
    price: 17.49,
    originalPrice: 19.99,
    store: stores.dirk,
    discountPercentage: 13,
    category: 'Rum',
    volume: '100cl',
    link: 'https://www.dirk.nl/boodschappen/dranken/sterke-drank/captain-morgan-original-spiced-gold/5732'
  },
  {
    id: '10',
    name: 'Glenfiddich 12 Years',
    imageUrl: '/placeholder.svg',
    price: 31.99,
    originalPrice: 38.99,
    store: stores.drankdozijn,
    discountPercentage: 18,
    category: 'Whisky',
    volume: '70cl',
    link: 'https://www.drankdozijn.nl/artikel/fles-glenfiddich-12-jaar-70cl'
  },
  {
    id: '11',
    name: 'Baileys Original Irish Cream',
    imageUrl: '/placeholder.svg',
    price: 13.99,
    originalPrice: 18.99,
    store: stores.ah,
    discountPercentage: 26,
    category: 'Likeur',
    volume: '70cl',
    link: 'https://www.ah.nl/producten/product/wi151246/baileys-original-irish-cream'
  },
  {
    id: '12',
    name: 'Ketel One Vodka',
    imageUrl: '/placeholder.svg',
    price: 18.49,
    originalPrice: 21.99,
    store: stores.gall,
    discountPercentage: 16,
    category: 'Vodka',
    volume: '70cl',
    link: 'https://www.gall.nl/p/ketel-one-vodka/'
  },
];
