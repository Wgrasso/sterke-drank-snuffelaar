
import { Store } from './types';

// Store data repository
export const stores: Record<string, Store> = {
  gall: {
    name: 'Gall & Gall',
    logo: 'https://static.s-moda.nl/img/logos/gall.svg'
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
    logo: 'https://media.drankdozijn.nl/catalog/logo/drankdozijn-logo.png'
  }
};

export const getStoreById = (id: string): Store | undefined => {
  return stores[id];
};

export const getStoreIdByName = (name: string): string | undefined => {
  return Object.entries(stores).find(
    ([_, storeData]) => storeData.name === name
  )?.[0];
};
