
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
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`${className} rounded-full overflow-hidden bg-white shadow-md`}>
            <img 
              src={storeLogoUrl} 
              alt={storeName} 
              className="h-full w-full object-contain p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImageUrl;
              }}
            />
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
