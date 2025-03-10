
import { useState } from 'react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StoreBadgeProps {
  storeName: string;
  storeLogoUrl: string;
  className?: string;
  fallbackImageUrl?: string;
}

const StoreBadge = ({ 
  storeName, 
  storeLogoUrl, 
  className = "h-8 w-8",
  fallbackImageUrl = "/placeholder.svg"
}: StoreBadgeProps) => {
  const [logoError, setLogoError] = useState(false);

  const handleError = () => {
    console.log(`Store logo error loading: ${storeLogoUrl}`);
    setLogoError(true);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`${className} rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center`}>
            {logoError ? (
              <span className="text-xs font-bold text-center">
                {storeName.charAt(0)}
              </span>
            ) : (
              <img 
                src={storeLogoUrl} 
                alt={storeName} 
                className="h-full w-full object-contain p-1"
                onError={handleError}
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{storeName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StoreBadge;
