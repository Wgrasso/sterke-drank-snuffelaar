
import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type ValidationState = 'validated' | 'unvalidated' | 'reported';

interface ProductValidationBadgeProps {
  state: ValidationState;
  showLabel?: boolean;
  className?: string;
}

const ProductValidationBadge: React.FC<ProductValidationBadgeProps> = ({ 
  state, 
  showLabel = true,
  className = ""
}) => {
  const getStateDetails = () => {
    switch (state) {
      case 'validated':
        return {
          icon: <CheckCircle className="w-3 h-3 mr-1 text-green-600" />,
          label: 'Gevalideerd',
          tooltip: 'Deze aanbieding is bevestigd door ons team',
          classes: 'bg-green-100 text-green-800'
        };
      case 'reported':
        return {
          icon: <AlertCircle className="w-3 h-3 mr-1 text-red-600" />,
          label: 'Probleem gemeld',
          tooltip: 'Er is een probleem gemeld bij deze aanbieding',
          classes: 'bg-red-100 text-red-800'
        };
      case 'unvalidated':
      default:
        return {
          icon: <Clock className="w-3 h-3 mr-1 text-orange-600" />,
          label: 'Wacht op validatie',
          tooltip: 'Deze aanbieding wordt momenteel gecontroleerd',
          classes: 'bg-orange-100 text-orange-800'
        };
    }
  };

  const { icon, label, tooltip, classes } = getStateDetails();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${classes} ${className}`}>
            {icon}
            {showLabel && <span>{label}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductValidationBadge;
