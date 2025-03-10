
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  store: {
    name: string;
    logo: string;
  };
  discountPercentage?: number;
  category: string;
  volume: string;
  link: string;
}

interface ProductGridProps {
  products: Product[];
  onFilterClick: () => void;
}

const ProductGrid = ({ products, onFilterClick }: ProductGridProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Aanbiedingen ({products.length})</h2>
        <Button 
          variant="outline" 
          onClick={onFilterClick}
          className="md:hidden flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted/30 p-8 rounded-full mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15.5 8.5l-7 7" /><path d="M4 22l.5-.5" /><path d="M2 19l2 2" />
              <circle cx="10" cy="10" r="8" /><path d="M20 14l2 2" /><path d="M20 14l2-2" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Geen producten gevonden</h3>
          <p className="text-muted-foreground mb-6">
            Probeer andere filters of zoek op een andere term.
          </p>
          <Button onClick={() => window.location.reload()}>
            Alle producten tonen
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
