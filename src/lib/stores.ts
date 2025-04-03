import { Store } from './types';
import { supabase } from '@/integrations/supabase/client';

// Store data repository - keeping this as a fallback
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
  dirk3: {
    name: 'Dirk 3',
    logo: 'https://www.dirk.nl/assets/images/dirk-logo.svg'
  },
  mitra: {
    name: 'Slijterij Mitra',
    logo: 'https://www.mitra.nl/wp-content/uploads/2016/05/mitra-logo.png'
  }
};

// Get store by id - now fetching from Supabase with local fallback
export const getStoreById = async (id: string): Promise<Store | undefined> => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data ? { name: data.name, logo: data.logo } : undefined;
  } catch (error) {
    console.error('Error fetching store:', error);
    // Fallback to local data
    return stores[id];
  }
};

// Get store id by name
export const getStoreIdByName = (name: string): string | undefined => {
  return Object.entries(stores).find(
    ([_, storeData]) => storeData.name === name
  )?.[0];
};

// Fetch all stores from Supabase
export const fetchAllStores = async (): Promise<Record<string, Store>> => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*');
    
    if (error) throw error;
    
    const storeMap: Record<string, Store> = {};
    data?.forEach(store => {
      storeMap[store.id] = { name: store.name, logo: store.logo };
    });
    
    return storeMap;
  } catch (error) {
    console.error('Error fetching stores:', error);
    // Fallback to local data
    return stores;
  }
};
