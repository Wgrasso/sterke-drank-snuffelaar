
import { Badge } from '@/components/ui/badge';

interface DiscountBadgeProps {
  discountPercentage: number;
  className?: string;
}

const DiscountBadge = ({ discountPercentage, className = "" }: DiscountBadgeProps) => {
  return (
    <Badge className={`bg-accent text-white font-medium px-2 py-1 ${className}`}>
      {discountPercentage}% Korting
    </Badge>
  );
};

export default DiscountBadge;
