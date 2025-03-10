
import { Product } from '../types';
import { stores } from '../stores';

// Mock liquor product data
export const liquorProducts: Product[] = [
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
