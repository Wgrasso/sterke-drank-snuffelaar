
import { useEffect, useState } from 'react';
import { fetchAllStores } from '@/lib/stores';
import { Store } from '@/lib/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import StoreSelector from './StoreSelector';

// Custom hook to fetch stores from Supabase
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

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({ isOpen, onClose, onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const handleStoreSelect = (storeId: string) => {
    setSelectedStores(prev => 
      prev.includes(storeId)
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    );
  };
  
  const handleResetFilters = () => {
    setPriceRange([0, 100]);
    setSelectedStores([]);
    setOnlyDiscounted(false);
  };
  
  const applyFilters = () => {
    onFilterChange({
      priceRange,
      selectedStores,
      onlyDiscounted
    });
    
    if (window.innerWidth < 768) {
      onClose();
    }
  };
  
  useEffect(() => {
    // Apply filters on mount and when they change
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, selectedStores, onlyDiscounted]);
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 hidden md:block sticky top-24">
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-lg">Filters</h3>
            <Button variant="ghost" size="sm" onClick={handleResetFilters} className="h-8 text-xs">
              Reset
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Prijs</h4>
              <div className="px-1">
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  max={100}
                  step={1}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Winkels</h4>
              <StoreSelector 
                selectedStores={selectedStores}
                onStoreSelect={handleStoreSelect}
              />
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Switch 
                  id="only-discounted" 
                  checked={onlyDiscounted}
                  onCheckedChange={setOnlyDiscounted}
                />
                <Label htmlFor="only-discounted">Alleen aanbiedingen</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Toon alleen producten met korting
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg">Filters</h3>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Prijs</h4>
                <div className="px-1">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={100}
                    step={1}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Winkels</h4>
                <StoreSelector 
                  selectedStores={selectedStores}
                  onStoreSelect={handleStoreSelect}
                />
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Switch 
                    id="only-discounted-mobile" 
                    checked={onlyDiscounted}
                    onCheckedChange={setOnlyDiscounted}
                  />
                  <Label htmlFor="only-discounted-mobile">Alleen aanbiedingen</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Toon alleen producten met korting
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={handleResetFilters}>
                  Reset
                </Button>
                <Button className="flex-1" onClick={applyFilters}>
                  Toepassen
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterSidebar;
