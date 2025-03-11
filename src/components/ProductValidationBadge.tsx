
import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type ValidationState = 'validated' | 'unvalidated' | 'reported';

interface ProductValidationBadgeProps {
  state: ValidationState;
  showLabel?: boolean;
  className?: string;
}

// This component is now a placeholder that doesn't render anything
const ProductValidationBadge: React.FC<ProductValidationBadgeProps> = ({ 
  state, 
  showLabel = true,
  className = ""
}) => {
  return null;
};

export default ProductValidationBadge;
