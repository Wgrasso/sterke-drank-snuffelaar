
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import ProductValidationBadge, { ValidationState } from './ProductValidationBadge';
import ProductImage from './product/ProductImage';
import StoreBadge from './product/StoreBadge';
import DiscountBadge from './product/DiscountBadge';
import ProductCardActions from './product/ProductCardActions';
import ProductPrice from './product/ProductPrice';
import ProductFeedbackDialog from './product/ProductFeedbackDialog';

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
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>('unvalidated');
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  
  const reportProblem = () => {
    setFeedbackOpen(true);
  };

  // Simulate a random validation status for demo
  useEffect(() => {
    // 80% chance of validation, 20% chance of unvalidated
    const isValidated = Math.random() > 0.2;
    setValidationState(isValidated ? 'validated' : 'unvalidated');
  }, []);
  
  return (
    <>
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
              <StoreBadge 
                storeName={product.store.name} 
                storeLogoUrl={product.store.logo} 
              />
            </div>
            
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-3 right-3 z-10">
                <DiscountBadge discountPercentage={product.discountPercentage || 0} />
              </div>
            )}
            
            {/* Validation Badge */}
            <div className="absolute bottom-3 left-3 z-10">
              <ProductValidationBadge state={validationState} showLabel={true} />
            </div>
            
            {/* Product Image */}
            <div className="absolute inset-0 bg-muted/20 flex items-center justify-center p-6">
              <ProductImage 
                imageUrl={product.imageUrl} 
                productName={product.name} 
              />
            </div>
            
            {/* Hover Actions */}
            <ProductCardActions 
              productLink={product.link} 
              onReportProblem={reportProblem} 
            />
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
            <ProductPrice 
              price={product.price} 
              originalPrice={product.originalPrice} 
              className="mt-auto pt-3" 
            />
          </div>
        </div>
      </motion.div>
      
      {/* Feedback Dialog */}
      <ProductFeedbackDialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        productId={product.id}
        productName={product.name}
      />
    </>
  );
};

export default ProductCard;
