
import { supabase } from '@/integrations/supabase/client';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  static async crawlWebsite(url: string, storeId: string): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      const result = await supabase.functions.invoke('scrape-deals', {
        body: { url, storeId }
      });
      
      return result.error 
        ? { success: false, error: result.error.message } 
        : { success: true, data: result.data };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to scraping service' 
      };
    }
  }
}
