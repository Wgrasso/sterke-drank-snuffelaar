
import { useState } from 'react';
import { scrapeDeals } from '@/lib/services/productService';
import { Button } from '@/components/ui/button';
import { Database, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ScraperButtonProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const ScraperButton = ({ onSuccess, compact = false }: ScraperButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScrape = async () => {
    setIsLoading(true);
    try {
      const result = await scrapeDeals();
      if (result.success) {
        toast.success('Aanbiedingen succesvol bijgewerkt!');
        if (onSuccess) onSuccess();
      } else {
        toast.error(`Fout bij het scrapen: ${result.message}`);
      }
    } catch (error) {
      toast.error('Er is iets misgegaan bij het ophalen van aanbiedingen.');
      console.error('Scraper error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleScrape}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Database className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">Aanbiedingen bijwerken</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleScrape}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <Database className="h-4 w-4" />
      )}
      <span>Verzamel aanbiedingen van alle stores</span>
    </Button>
  );
};

export default ScraperButton;
