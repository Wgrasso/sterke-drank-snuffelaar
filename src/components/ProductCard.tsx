
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProductCardProps {
  product: {
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
  };
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg"
    >
      <div className="bg-card hover:shadow-xl transition-all duration-300 rounded-lg h-full flex flex-col">
        <div className="relative overflow-hidden pt-[100%]">
          {/* Store Badge */}
          <div className="absolute top-3 left-3 z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-white shadow-md">
                    <img 
                      src={product.store.logo} 
                      alt={product.store.name} 
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{product.store.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-accent text-white font-medium px-2 py-1">
                {product.discountPercentage}% Korting
              </Badge>
            </div>
          )}
          
          {/* Product Image */}
          <div className="absolute inset-0 bg-muted/20 flex items-center justify-center p-6">
            <div className="relative w-full h-full image-blur-wrapper">
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-full object-contain transition-all duration-500 ease-out ${
                  imageLoaded ? "loaded" : "image-blur"
                }`}
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Hover Button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <a 
              href={product.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full"
            >
              <Button className="w-full gap-2 group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                <ShoppingBag className="w-4 h-4" />
                <span>Bekijk aanbieding</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </a>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          {/* Category + Volume Badge */}
          <div className="mb-2">
            <Badge variant="outline" className="text-xs font-normal">
              {product.category} • {product.volume}
            </Badge>
          </div>
          
          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="hover:text-accent transition-colors">
            <h3 className="font-medium line-clamp-2 h-12">{product.name}</h3>
          </Link>
          
          {/* Product Price */}
          <div className="mt-auto pt-3 flex items-baseline">
            <span className="text-lg font-semibold">€{product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                €{product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
