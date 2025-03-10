
import { Store } from './types';

// Store data repository
export const stores: Record<string, Store> = {
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

export const getStoreById = (id: string): Store | undefined => {
  return stores[id];
};

export const getStoreIdByName = (name: string): string | undefined => {
  return Object.entries(stores).find(
    ([_, storeData]) => storeData.name === name
  )?.[0];
};
