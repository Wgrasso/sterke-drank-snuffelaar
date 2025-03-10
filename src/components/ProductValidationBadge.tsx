
import { Check, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ValidationStatus = 'validated' | 'unvalidated' | 'reported';

interface ProductValidationBadgeProps {
  status: ValidationStatus;
  className?: string;
}

const ProductValidationBadge = ({ status, className = '' }: ProductValidationBadgeProps) => {
  let icon;
  let text;
  let colors;
  let tooltipText;
  
  switch (status) {
    case 'validated':
      icon = <Check className="w-3 h-3" />;
      text = 'Gevalideerd';
      colors = 'bg-green-100 text-green-800 border-green-200';
      tooltipText = 'Deze aanbieding is door ons team bevestigd';
      break;
    case 'reported':
      icon = <AlertTriangle className="w-3 h-3" />;
      text = 'Gerapporteerd';
      colors = 'bg-red-100 text-red-800 border-red-200';
      tooltipText = 'Deze aanbieding is door gebruikers als mogelijk onjuist gerapporteerd';
      break;
    default:
      icon = <Clock className="w-3 h-3" />;
      text = 'In behandeling';
      colors = 'bg-orange-100 text-orange-800 border-orange-200';
      tooltipText = 'Deze aanbieding wordt momenteel gecontroleerd';
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`flex items-center gap-1 px-2 ${colors} ${className}`}>
            {icon}
            <span className="text-xs font-medium">{text}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductValidationBadge;
