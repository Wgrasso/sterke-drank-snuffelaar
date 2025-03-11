
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { fetchProducts } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Category-specific banners and descriptions
const categoryInfo = {
  whisky: {
    title: "Whisky Aanbiedingen",
    description: "Ontdek de beste whisky's van Schotland, Ierland, Amerika en Japan tegen scherpe prijzen.",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  vodka: {
    title: "Vodka Aanbiedingen",
    description: "Premium vodka's uit Rusland, Polen, Zweden en wereldwijd tegen de beste prijzen.",
    image: "https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  rum: {
    title: "Rum Aanbiedingen",
    description: "Exotische rums uit het Caribisch gebied en Latijns-Amerika voor de echte liefhebber.",
    image: "https://images.unsplash.com/photo-1514218953589-2d7d87fe578e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  gin: {
    title: "Gin Aanbiedingen",
    description: "Ontdek de wereld van gin met klassieke en botanische varianten tegen scherpe prijzen.",
    image: "https://images.unsplash.com/photo-1620223877391-f8a8b7d13504?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  likeur: {
    title: "Likeur Aanbiedingen",
    description: "Zoete en aromatische likeuren in alle smaken voor cocktails en desserts.",
    image: "https://images.unsplash.com/photo-1588685562217-8147530e5874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  aanbiedingen: {
    title: "Alle Aanbiedingen",
    description: "De beste drank deals van dit moment, verzameld van alle grote Nederlandse slijterijen.",
    image: "https://images.unsplash.com/photo-1509807995916-c332365e2d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
};

const ProductListingPage = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[1] || 'aanbiedingen';
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
      category: category !== 'aanbiedingen' ? category : undefined,
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
  
  const currentCategoryInfo = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.aanbiedingen;
  
  const pageTitle = searchQuery 
    ? `Zoekresultaten voor "${searchQuery}"` 
    : currentCategoryInfo.title;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Category Banner */}
        <div className="relative h-[200px] md:h-[250px] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src={currentCategoryInfo.image} 
            alt={currentCategoryInfo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{pageTitle}</h1>
            <p className="text-white/90 max-w-2xl">{currentCategoryInfo.description}</p>
            
            {searchQuery && (
              <div className="flex items-center gap-2 mt-4">
                <Badge className="bg-accent text-white px-3 py-1">
                  {searchQuery}
                </Badge>
                <Button 
                  variant="secondary" 
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
        </div>
        
        <div className="container px-4 mx-auto py-8">
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
