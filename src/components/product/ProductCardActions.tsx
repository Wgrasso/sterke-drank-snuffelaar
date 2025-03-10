
import { ExternalLink, ShoppingBag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardActionsProps {
  productLink: string;
  onReportProblem: () => void;
}

const ProductCardActions = ({ productLink, onReportProblem }: ProductCardActionsProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-4">
      <div className="w-full space-y-2">
        <a 
          href={productLink} 
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
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/80 backdrop-blur-sm"
          onClick={onReportProblem}
        >
          <AlertTriangle className="w-3 h-3 mr-1" />
          <span>Meld onjuiste info</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCardActions;
