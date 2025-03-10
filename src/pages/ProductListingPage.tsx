
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const ProductListingPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 100] as [number, number],
    selectedStores: [] as string[],
    selectedCategories: [] as string[],
    onlyValidated: false,
    onlyDiscounted: false,
  });
  
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products', category, searchQuery, filters],
    queryFn: () => fetchProducts({
      category: category,
      search: searchQuery,
      priceRange: filters.priceRange,
      stores: filters.selectedStores.length ? filters.selectedStores : undefined,
      onlyValidated: filters.onlyValidated,
      onlyDiscounted: filters.onlyDiscounted,
    }),
  });
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const clearSearch = () => {
    searchParams.delete('q');
    setSearchParams(searchParams);
  };
  
  const pageTitle = category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}` 
    : searchQuery 
      ? `Zoekresultaten voor "${searchQuery}"` 
      : 'Alle Aanbiedingen';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{pageTitle}</h1>
            {searchQuery && (
              <div className="flex items-center gap-2">
                <Badge className="bg-accent text-white px-3 py-1">
                  {searchQuery}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearSearch} 
                  className="h-7 px-2 text-sm gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Wissen</span>
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <FilterSidebar 
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onFilterChange={handleFilterChange}
            />
            
            <div className="flex-grow">
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-card animate-pulse rounded-lg h-[300px]"></div>
                  ))}
                </div>
              ) : isError ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Er ging iets mis</h3>
                  <p className="text-muted-foreground mb-6">
                    We konden de producten niet laden. Probeer het later opnieuw.
                  </p>
                  <Button onClick={() => window.location.reload()}>
                    Opnieuw proberen
                  </Button>
                </div>
              ) : (
                <ProductGrid 
                  products={products || []}
                  onFilterClick={() => setIsFilterOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductListingPage;
