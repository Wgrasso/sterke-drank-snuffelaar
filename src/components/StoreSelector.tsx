
import { useState, useEffect } from 'react';
import { useStores } from '@/components/FilterSidebar';
import { Store } from '@/lib/types';
import StoreBadge from './product/StoreBadge';
import { motion } from 'framer-motion';

interface StoreSelectorProps {
  selectedStores: string[];
  onStoreSelect: (storeId: string) => void;
}

const StoreSelector = ({ selectedStores, onStoreSelect }: StoreSelectorProps) => {
  const { stores, loading, error } = useStores();
  
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-14 bg-muted rounded-md"></div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-sm text-red-500 p-2 rounded-md bg-red-50">
        Er ging iets mis bij het laden van de winkels.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-3 gap-3">
      {Object.entries(stores).map(([storeId, store]) => (
        <motion.button
          key={storeId}
          className={`p-2 rounded-md flex flex-col items-center justify-center gap-1 transition-colors ${
            selectedStores.includes(storeId)
              ? 'bg-accent/10 border border-accent'
              : 'bg-card hover:bg-muted/50 border border-border'
          }`}
          onClick={() => onStoreSelect(storeId)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <StoreBadge
            storeName={store.name}
            storeLogoUrl={store.logo}
            className="h-8 w-8"
          />
          <span className="text-xs font-medium text-center leading-tight">
            {store.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default StoreSelector;
