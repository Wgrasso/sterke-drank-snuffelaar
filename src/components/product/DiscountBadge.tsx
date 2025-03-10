
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface DiscountBadgeProps {
  discountPercentage: number;
  className?: string;
}

const DiscountBadge = ({ discountPercentage, className = "" }: DiscountBadgeProps) => {
  // Make sure discount is a valid number and round it
  const validDiscount = isNaN(discountPercentage) ? 0 : Math.round(discountPercentage);
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Badge className={`bg-accent text-white font-medium px-2 py-1 ${className}`}>
        {validDiscount}% Korting
      </Badge>
    </motion.div>
  );
};

export default DiscountBadge;
