
import { motion } from 'framer-motion';

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

const ProductPrice = ({ price, originalPrice, className = "" }: ProductPriceProps) => {
  const hasDiscount = originalPrice && originalPrice > price;
  
  // Format the prices correctly
  const formatPrice = (value: number) => {
    // Make sure we have a valid number
    if (isNaN(value) || value < 0) return "0.00";
    return value.toFixed(2);
  };
  
  return (
    <div className={`flex items-baseline ${className}`}>
      <span className="text-lg font-semibold">€{formatPrice(price)}</span>
      {hasDiscount && (
        <motion.span 
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-2 text-sm text-muted-foreground line-through"
        >
          €{formatPrice(originalPrice as number)}
        </motion.span>
      )}
    </div>
  );
};

export default ProductPrice;
