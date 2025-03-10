
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({ isOpen, onClose, onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
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
    });
    if (window.innerWidth < 768) {
      onClose();
    }
  };
  
  const clearFilters = () => {
    setPriceRange([0, 100]);
    setSelectedStores([]);
    setSelectedCategories([]);
    onFilterChange({
      priceRange: [0, 100],
      selectedStores: [],
      selectedCategories: [],
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div 
        className={`fixed md:sticky top-0 h-screen md:h-[calc(100vh-4rem)] overflow-y-auto w-[280px] md:w-[240px] bg-background md:bg-transparent border-r md:border-r-0 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-6 flex-grow">
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
                      className="text-sm cursor-pointer flex-grow hover:text-accent transition-colors"
                    >
                      {store.name}
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
            <Button onClick={applyFilters} className="w-full">
              Filters toepassen
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Filters wissen
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
