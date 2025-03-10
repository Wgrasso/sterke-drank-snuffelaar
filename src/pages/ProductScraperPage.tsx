
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { scrapeProductUrl, compareProductWithDatabase } from '@/lib/services/scraperService';
import { fetchProducts } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Link as LinkIcon, Loader2 } from 'lucide-react';

const ProductScraperPage = () => {
  const [productUrl, setProductUrl] = useState('');
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [scrapedProduct, setScrapedProduct] = useState<Partial<Product> | null>(null);
  const [comparisonResult, setComparisonResult] = useState<{ isMatch: boolean; differences: string[] } | null>(null);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);
  
  // Load all products for comparison
  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });
  
  const handleScrape = async () => {
    if (!productUrl) {
      toast.error('Please enter a product URL');
      return;
    }
    
    setIsScrapingActive(true);
    setScrapedProduct(null);
    setComparisonResult(null);
    setMatchedProduct(null);
    
    try {
      const result = await scrapeProductUrl(productUrl);
      
      if (result.success && result.product) {
        setScrapedProduct(result.product);
        toast.success('Website scraped successfully');
        
        // Try to find a matching product in our database
        if (allProducts && allProducts.length > 0 && result.product.link) {
          // First try to match by URL
          let foundProduct = allProducts.find(p => p.link === result.product?.link);
          
          // If no match by URL, try to match by name (case insensitive)
          if (!foundProduct && result.product.name) {
            foundProduct = allProducts.find(
              p => p.name.toLowerCase() === result.product?.name?.toLowerCase()
            );
          }
          
          if (foundProduct) {
            setMatchedProduct(foundProduct);
            
            // Compare the scraped data with our database
            const comparison = await compareProductWithDatabase(result.product, foundProduct);
            setComparisonResult(comparison);
            
            if (comparison.isMatch) {
              toast.success('Product information is up to date!');
            } else {
              toast.warning(`Found ${comparison.differences.length} differences!`);
            }
          } else {
            toast.info('No matching product found in the database');
          }
        }
      } else {
        toast.error(result.error || 'Failed to scrape product information');
      }
    } catch (error) {
      console.error('Scraping error:', error);
      toast.error('Error during scraping process');
    } finally {
      setIsScrapingActive(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Product Scraper</h1>
          
          <div className="max-w-2xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Scrape Product Information</CardTitle>
                <CardDescription>
                  Enter a product URL to verify and update the information in our database.
                  Currently supports drankdozijn.nl.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <Input
                      placeholder="Enter product URL (e.g., https://drankdozijn.nl/artikel/fles-bombay-sapphire-gin-1ltr)"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      className="w-full"
                      disabled={isScrapingActive}
                    />
                  </div>
                  <Button 
                    onClick={handleScrape} 
                    disabled={isScrapingActive || !productUrl}
                    className="whitespace-nowrap"
                  >
                    {isScrapingActive ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Scrape
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {scrapedProduct && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Scraped Information</CardTitle>
                  <CardDescription>
                    Information retrieved from the website.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-4">Product Details</h3>
                      <div className="space-y-2">
                        <p><strong>Name:</strong> {scrapedProduct.name}</p>
                        <p><strong>Price:</strong> €{scrapedProduct.price?.toFixed(2)}</p>
                        {scrapedProduct.originalPrice && (
                          <p><strong>Original Price:</strong> €{scrapedProduct.originalPrice.toFixed(2)}</p>
                        )}
                        {scrapedProduct.discountPercentage !== undefined && (
                          <p><strong>Discount:</strong> {scrapedProduct.discountPercentage}%</p>
                        )}
                        {scrapedProduct.volume && (
                          <p><strong>Volume:</strong> {scrapedProduct.volume}</p>
                        )}
                        {scrapedProduct.category && (
                          <p><strong>Category:</strong> {scrapedProduct.category}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      {scrapedProduct.imageUrl && (
                        <div className="flex flex-col items-center">
                          <div className="bg-muted/20 rounded-lg p-4 mb-2">
                            <img 
                              src={scrapedProduct.imageUrl} 
                              alt={scrapedProduct.name} 
                              className="h-48 object-contain"
                            />
                          </div>
                          <a 
                            href={scrapedProduct.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline flex items-center"
                          >
                            <LinkIcon className="h-3 w-3 mr-1" />
                            View Original Product
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {matchedProduct && comparisonResult && (
              <Card className={comparisonResult.isMatch ? "border-green-500" : "border-amber-500"}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Comparison with Database</CardTitle>
                    {comparisonResult.isMatch ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Match
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-500 border-amber-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {comparisonResult.differences.length} Differences
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {comparisonResult.isMatch 
                      ? "The product information in our database matches the website."
                      : "There are differences between our database and the website."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {comparisonResult.isMatch ? (
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg text-center">
                      <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                      <p className="text-green-700 dark:text-green-300">
                        Great! Our product information is up to date.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="font-medium mb-2">Found Differences:</h3>
                      <ul className="space-y-1 text-amber-700 dark:text-amber-300">
                        {comparisonResult.differences.map((difference, index) => (
                          <li key={index} className="bg-amber-50 dark:bg-amber-950/20 p-2 rounded">
                            • {difference}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-end">
                    {!comparisonResult.isMatch && (
                      <Button>
                        Update Database
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductScraperPage;
