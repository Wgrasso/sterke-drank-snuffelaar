
// Since FilterSidebar is read-only, we need to create a new component that loads stores from Supabase
// Create a new hook to fetch stores

import { useEffect, useState } from 'react';
import { fetchAllStores } from '@/lib/stores';
import { Store } from '@/lib/types';

export const useStores = () => {
  const [stores, setStores] = useState<Record<string, Store>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        setLoading(true);
        const storeData = await fetchAllStores();
        setStores(storeData);
      } catch (err) {
        console.error('Error loading stores:', err);
        setError(err instanceof Error ? err : new Error('Failed to load stores'));
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  return { stores, loading, error };
};
