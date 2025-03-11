
import { ExternalLink, ShoppingBag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductCardActionsProps {
  productLink: string;
  onReportProblem: () => void;
}

const ProductCardActions = ({ productLink, onReportProblem }: ProductCardActionsProps) => {
  const [linkError, setLinkError] = useState(false);
  
  const handleVisitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if the link is valid
    if (!productLink || !productLink.startsWith('http')) {
      e.preventDefault();
      setLinkError(true);
      console.error('Invalid product link:', productLink);
      // Report the problem automatically
      onReportProblem();
      return;
    }
    
    // Track outbound link click
    console.log('Outbound link clicked:', productLink);
  };
  
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-4">
      <div className="w-full space-y-2">
        {linkError ? (
          <Button 
            className="w-full gap-2 bg-red-500 hover:bg-red-600"
            onClick={onReportProblem}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Ongeldige link gemeld</span>
          </Button>
        ) : (
          <a 
            href={productLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full"
            onClick={handleVisitClick}
          >
            <Button className="w-full gap-2 group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
              <ShoppingBag className="w-4 h-4" />
              <span>Bekijk aanbieding</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductCardActions;
