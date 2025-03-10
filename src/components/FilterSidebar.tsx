
import { useState, useEffect } from 'react';
import { Filter, X, RefreshCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({ isOpen, onClose, onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyValidated, setOnlyValidated] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  
  const stores = [
    { id: 'gall', name: 'Gall & Gall' },
    { id: 'jumbo', name: 'Jumbo' },
    { id: 'ah', name: 'Albert Heijn' },
    { id: 'dirk', name: 'Dirk' },
    { id: 'drankdozijn', name: 'Drankdozijn' },
  ];
  
  const categories = [
    { id: 'whisky', name: 'Whisky' },
    { id: 'vodka', name: 'Vodka' },
    { id: 'rum', name: 'Rum' },
    { id: 'gin', name: 'Gin' },
    { id: 'likeur', name: 'Likeur' },
  ];

  // Telkens wanneer filters worden bijgewerkt
  useEffect(() => {
    const timeout = setTimeout(() => {
      applyFilters();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [priceRange, selectedStores, selectedCategories, onlyValidated, onlyDiscounted]);
  
  const handleStoreToggle = (storeId: string) => {
    setSelectedStores(prev => 
      prev.includes(storeId) 
        ? prev.filter(id => id !== storeId) 
        : [...prev, storeId]
    );
  };
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const applyFilters = () => {
    onFilterChange({
      priceRange,
      selectedStores,
      selectedCategories,
      onlyValidated,
      onlyDiscounted,
    });
  };
  
  const clearFilters = () => {
    setPriceRange([0, 100]);
    setSelectedStores([]);
    setSelectedCategories([]);
    setOnlyValidated(false);
    setOnlyDiscounted(false);
    
    onFilterChange({
      priceRange: [0, 100],
      selectedStores: [],
      selectedCategories: [],
      onlyValidated: false,
      onlyDiscounted: false,
    });
  };

  // Tel het aantal actieve filters
  const activeFilterCount = 
    (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0) + 
    selectedStores.length + 
    selectedCategories.length +
    (onlyValidated ? 1 : 0) +
    (onlyDiscounted ? 1 : 0);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          ></motion.div>
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <div 
        className={`fixed md:sticky top-0 h-screen md:h-[calc(100vh-4rem)] overflow-y-auto w-[300px] md:w-[260px] bg-background md:bg-transparent border-r md:border-r-0 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">{activeFilterCount}</Badge>
              )}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-6 flex-grow">
            {/* Validated Switch */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="validated-switch" className="font-medium">Alleen gevalideerd</Label>
                <span className="text-xs text-muted-foreground">Toon alleen gecontroleerde deals</span>
              </div>
              <Switch
                id="validated-switch"
                checked={onlyValidated}
                onCheckedChange={setOnlyValidated}
              />
            </div>

            {/* Discounted Switch */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="discount-switch" className="font-medium">Alleen aanbiedingen</Label>
                <span className="text-xs text-muted-foreground">Toon alleen producten met korting</span>
              </div>
              <Switch
                id="discount-switch"
                checked={onlyDiscounted}
                onCheckedChange={setOnlyDiscounted}
              />
            </div>
            
            <Separator />
            
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-4">Prijsrange</h3>
              <div className="mb-6">
                <Slider 
                  value={[priceRange[0], priceRange[1]]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={handlePriceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Stores */}
            <div>
              <h3 className="font-medium mb-4">Winkels</h3>
              <div className="space-y-2">
                {stores.map(store => (
                  <div key={store.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`store-${store.id}`} 
                      checked={selectedStores.includes(store.id)} 
                      onCheckedChange={() => handleStoreToggle(store.id)}
                    />
                    <label 
                      htmlFor={`store-${store.id}`} 
                      className="text-sm cursor-pointer flex-grow hover:text-accent transition-colors flex items-center justify-between"
                    >
                      <span>{store.name}</span>
                      {selectedStores.includes(store.id) && (
                        <Check className="w-3 h-3 text-accent" />
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-4">Categorieën</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge 
                    key={category.id}
                    variant={selectedCategories.includes(category.id) ? "default" : "outline"} 
                    className={`cursor-pointer transition-all ${
                      selectedCategories.includes(category.id) ? 'bg-accent text-white' : 'hover:bg-accent/10'
                    }`}
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-6 space-y-2 mt-auto">
            <Button onClick={clearFilters} variant="outline" className="w-full gap-2">
              <RefreshCcw className="w-4 h-4" />
              Filters wissen
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
