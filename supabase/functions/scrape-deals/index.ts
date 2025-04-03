
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a single Supabase client for interacting with the database
const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://yytunwhezparvofxkjds.supabase.co'
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Helper function to normalize price
const normalizePrice = (priceStr: string): number => {
  const cleanedPrice = priceStr.replace(/[^\d,\.]/g, '').replace(',', '.')
  return parseFloat(cleanedPrice)
}

// Function to calculate discount percentage
const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

// Store-specific scraper functions
const scrapers = {
  // Gall & Gall scraper
  async gall(document: Document, productUrl: string) {
    try {
      const name = document.querySelector('h1')?.textContent?.trim();
      const priceElement = document.querySelector('.price');
      const originalPriceElement = document.querySelector('.old-price');
      const volumeElement = document.querySelector('.volume');
      
      // If we can't find the name, consider the page format changed
      if (!name) {
        console.error('Failed to extract product name from Gall & Gall page');
        return null;
      }
      
      const priceStr = priceElement?.textContent?.trim() || '';
      const originalPriceStr = originalPriceElement?.textContent?.trim() || '';
      const price = priceStr ? normalizePrice(priceStr) : 0;
      const originalPrice = originalPriceStr ? normalizePrice(originalPriceStr) : null;
      const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;
      const volume = volumeElement?.textContent?.trim() || '70cl'; // Default to 70cl if not found
      
      // Determine category from product name or URL
      let category = 'Overig'; // Default category
      const categoryKeywords = {
        'Whisky': ['whisky', 'whiskey', 'bourbon', 'scotch'],
        'Vodka': ['vodka'],
        'Rum': ['rum'],
        'Gin': ['gin'],
        'Likeur': ['likeur', 'liqueur', 'likeuren'],
        'Cognac': ['cognac'],
        'Brandy': ['brandy'],
        'Tequila': ['tequila', 'mezcal'],
        'Bier': ['bier', 'beer'],
        'Wijn': ['wijn', 'wine']
      };
      
      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => 
          name.toLowerCase().includes(keyword) || 
          productUrl.toLowerCase().includes(keyword))) {
          category = cat;
          break;
        }
      }
      
      return {
        name,
        price,
        originalPrice,
        discountPercentage,
        volume,
        category,
        imageUrl: '/placeholder.svg', // Default image
        link: productUrl,
        storeId: 'gall'
      };
    } catch (error) {
      console.error(`Error parsing Gall & Gall product: ${error}`);
      return null;
    }
  },
  
  // Albert Heijn scraper
  async ah(document: Document, productUrl: string) {
    try {
      const name = document.querySelector('h1')?.textContent?.trim();
      const priceElement = document.querySelector('.price');
      const originalPriceElement = document.querySelector('.was-price');
      
      if (!name) {
        console.error('Failed to extract product name from Albert Heijn page');
        return null;
      }
      
      const priceStr = priceElement?.textContent?.trim() || '';
      const originalPriceStr = originalPriceElement?.textContent?.trim() || '';
      const price = priceStr ? normalizePrice(priceStr) : 0;
      const originalPrice = originalPriceStr ? normalizePrice(originalPriceStr) : null;
      const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;
      
      // Extract volume from the product name
      let volume = '70cl'; // Default value
      const volumeMatch = name.match(/(\d+\s*[cm]l)/i);
      if (volumeMatch) {
        volume = volumeMatch[1];
      }
      
      // Determine category from product name or URL
      let category = 'Overig'; // Default category
      const categoryKeywords = {
        'Whisky': ['whisky', 'whiskey', 'bourbon', 'scotch'],
        'Vodka': ['vodka'],
        'Rum': ['rum'],
        'Gin': ['gin'],
        'Likeur': ['likeur', 'liqueur', 'likeuren'],
        'Cognac': ['cognac'],
        'Brandy': ['brandy'],
        'Tequila': ['tequila', 'mezcal'],
        'Bier': ['bier', 'beer'],
        'Wijn': ['wijn', 'wine']
      };
      
      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => 
          name.toLowerCase().includes(keyword) || 
          productUrl.toLowerCase().includes(keyword))) {
          category = cat;
          break;
        }
      }
      
      return {
        name,
        price,
        originalPrice,
        discountPercentage,
        volume,
        category,
        imageUrl: '/placeholder.svg', // Default image
        link: productUrl,
        storeId: 'ah'
      };
    } catch (error) {
      console.error(`Error parsing Albert Heijn product: ${error}`);
      return null;
    }
  },
  
  // Similar functions for other stores can be added here
  async jumbo(document: Document, productUrl: string) {
    // Implementation for Jumbo
    try {
      const name = document.querySelector('h1')?.textContent?.trim();
      const priceElement = document.querySelector('.jum-price');
      const originalPriceElement = document.querySelector('.jum-original-price');
      
      if (!name) return null;
      
      const priceStr = priceElement?.textContent?.trim() || '';
      const originalPriceStr = originalPriceElement?.textContent?.trim() || '';
      const price = priceStr ? normalizePrice(priceStr) : 0;
      const originalPrice = originalPriceStr ? normalizePrice(originalPriceStr) : null;
      const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;
      
      // Basic category detection
      let category = 'Overig';
      if (name.toLowerCase().includes('whisky') || name.toLowerCase().includes('whiskey')) {
        category = 'Whisky';
      } else if (name.toLowerCase().includes('vodka')) {
        category = 'Vodka';
      } else if (name.toLowerCase().includes('rum')) {
        category = 'Rum';
      }
      
      return {
        name,
        price,
        originalPrice,
        discountPercentage,
        volume: '70cl', // Default
        category,
        imageUrl: '/placeholder.svg',
        link: productUrl,
        storeId: 'jumbo'
      };
    } catch (error) {
      console.error(`Error parsing Jumbo product: ${error}`);
      return null;
    }
  },
  
  async dirk(document: Document, productUrl: string) {
    // Implementation for Dirk
    try {
      const name = document.querySelector('h1')?.textContent?.trim();
      const priceElement = document.querySelector('.price');
      
      if (!name) return null;
      
      const priceStr = priceElement?.textContent?.trim() || '0';
      const price = normalizePrice(priceStr);
      
      // Basic category detection
      let category = 'Overig';
      if (name.toLowerCase().includes('whisky') || name.toLowerCase().includes('whiskey')) {
        category = 'Whisky';
      } else if (name.toLowerCase().includes('vodka')) {
        category = 'Vodka';
      } else if (name.toLowerCase().includes('rum')) {
        category = 'Rum';
      }
      
      return {
        name,
        price,
        originalPrice: null,
        discountPercentage: 0,
        volume: '70cl', // Default
        category,
        imageUrl: '/placeholder.svg',
        link: productUrl,
        storeId: 'dirk'
      };
    } catch (error) {
      console.error(`Error parsing Dirk product: ${error}`);
      return null;
    }
  },
  
  async mitra(document: Document, productUrl: string) {
    // Implementation for Mitra
    try {
      const name = document.querySelector('h1')?.textContent?.trim();
      const priceElement = document.querySelector('.price');
      const originalPriceElement = document.querySelector('.original-price');
      
      if (!name) return null;
      
      const priceStr = priceElement?.textContent?.trim() || '0';
      const originalPriceStr = originalPriceElement?.textContent?.trim() || '';
      const price = normalizePrice(priceStr);
      const originalPrice = originalPriceStr ? normalizePrice(originalPriceStr) : null;
      const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;
      
      // Basic category detection
      let category = 'Overig';
      if (name.toLowerCase().includes('whisky') || name.toLowerCase().includes('whiskey')) {
        category = 'Whisky';
      } else if (name.toLowerCase().includes('vodka')) {
        category = 'Vodka';
      } else if (name.toLowerCase().includes('rum')) {
        category = 'Rum';
      }
      
      return {
        name,
        price,
        originalPrice,
        discountPercentage,
        volume: '70cl', // Default
        category,
        imageUrl: '/placeholder.svg',
        link: productUrl,
        storeId: 'mitra'
      };
    } catch (error) {
      console.error(`Error parsing Mitra product: ${error}`);
      return null;
    }
  }
};

// List of URLs to scrape for each store
const storeUrls = {
  gall: [
    'https://www.gall.nl/shop/aanbiedingen/sterke-drank/',
    'https://www.gall.nl/shop/whisky/aanbiedingen/',
    'https://www.gall.nl/shop/vodka/aanbiedingen/',
    'https://www.gall.nl/shop/gin/aanbiedingen/',
    'https://www.gall.nl/shop/rum/aanbiedingen/',
    'https://www.gall.nl/shop/likeuren/aanbiedingen/'
  ],
  ah: [
    'https://www.ah.nl/producten/sterke-drank/aanbiedingen'
  ],
  jumbo: [
    'https://www.jumbo.com/aanbiedingen/dranken/sterke-drank/'
  ],
  dirk: [
    'https://www.dirk.nl/aanbiedingen/dranken/gedistilleerd/'
  ],
  mitra: [
    'https://www.mitra.nl/aanbiedingen/'
  ]
};

// Main function to handle the HTTP request
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const requestData = await req.json();
    const { storeIds = ['gall', 'ah', 'jumbo', 'dirk', 'mitra'], url, storeId } = requestData;
    
    // If a specific URL and storeId are provided, scrape just that URL
    if (url && storeId) {
      console.log(`Scraping specific URL: ${url} for store ${storeId}`);
      
      try {
        // Fetch the HTML content
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Parse the HTML
        const parser = new DOMParser();
        const document = parser.parseFromString(html, 'text/html');
        
        // Call the appropriate scraper function
        const scraper = scrapers[storeId as keyof typeof scrapers];
        if (!scraper) {
          throw new Error(`No scraper implemented for store: ${storeId}`);
        }
        
        const productData = await scraper(document, url);
        
        if (productData) {
          // Map the data to database format
          const product = {
            name: productData.name,
            image_url: productData.imageUrl,
            price: productData.price,
            original_price: productData.originalPrice,
            discount_percentage: productData.discountPercentage,
            category: productData.category,
            volume: productData.volume,
            link: productData.link,
            store_id: storeId
          };
          
          // Insert into database
          const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select();
          
          if (error) {
            console.error(`Error inserting product ${productData.name}:`, error);
            throw error;
          }
          
          console.log(`Successfully inserted product: ${productData.name}`);
          
          return new Response(JSON.stringify({
            success: true,
            message: `Successfully scraped and inserted product: ${productData.name}`,
            product: data[0]
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } else {
          throw new Error('Failed to extract product data');
        }
      } catch (error) {
        console.error('Error scraping specific URL:', error);
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Process all stores
    console.log(`Starting scraping for stores: ${storeIds.join(', ')}`);
    
    const scrapedProducts = [];
    let totalInserted = 0;
    
    // Process each store
    for (const storeId of storeIds) {
      console.log(`Processing store: ${storeId}`);
      
      // Check if store exists in the database
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .single();
      
      if (storeError || !storeData) {
        console.error(`Store ${storeId} not found in database`, storeError);
        continue;
      }
      
      const storeUrlList = storeUrls[storeId as keyof typeof storeUrls] || [];
      
      for (const url of storeUrlList) {
        console.log(`Processing URL: ${url} for store ${storeId}`);
        
        try {
          // Fetch the HTML content
          const response = await fetch(url);
          if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
            continue;
          }
          
          const html = await response.text();
          console.log(`Got HTML from ${url}, length: ${html.length}`);
          
          // Extract product links from the page
          const parser = new DOMParser();
          const document = parser.parseFromString(html, 'text/html');
          
          // Different selectors for different stores
          let productLinks: string[] = [];
          
          switch(storeId) {
            case 'gall':
              document.querySelectorAll('a[href*="/p/"]').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes('/p/')) {
                  productLinks.push(new URL(href, 'https://www.gall.nl').href);
                }
              });
              break;
            case 'ah':
              document.querySelectorAll('a[href*="/producten/"]').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes('/producten/')) {
                  productLinks.push(new URL(href, 'https://www.ah.nl').href);
                }
              });
              break;
            // Add similar logic for other stores
            default:
              // Generic approach
              document.querySelectorAll('a').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes('product')) {
                  productLinks.push(new URL(href, url).href);
                }
              });
          }
          
          // Remove duplicates
          productLinks = [...new Set(productLinks)];
          console.log(`Found ${productLinks.length} product links for ${storeId}`);
          
          // Process each product URL (limit to first 5 for testing)
          for (const productUrl of productLinks.slice(0, 5)) {
            try {
              console.log(`Scraping product: ${productUrl}`);
              const productResponse = await fetch(productUrl);
              if (!productResponse.ok) {
                console.error(`Failed to fetch product ${productUrl}`);
                continue;
              }
              
              const productHtml = await productResponse.text();
              const productDocument = parser.parseFromString(productHtml, 'text/html');
              
              // Call the appropriate scraper function
              const scraper = scrapers[storeId as keyof typeof scrapers];
              if (!scraper) {
                console.error(`No scraper implemented for store: ${storeId}`);
                continue;
              }
              
              const productData = await scraper(productDocument, productUrl);
              
              if (productData) {
                // Map the data to database format
                const product = {
                  name: productData.name,
                  image_url: productData.imageUrl,
                  price: productData.price,
                  original_price: productData.originalPrice,
                  discount_percentage: productData.discountPercentage,
                  category: productData.category,
                  volume: productData.volume,
                  link: productData.link,
                  store_id: storeId
                };
                
                // Insert into database
                const { data, error } = await supabase
                  .from('products')
                  .insert(product)
                  .select();
                
                if (error) {
                  console.error(`Error inserting product ${productData.name}:`, error);
                } else {
                  console.log(`Successfully inserted product: ${productData.name}`);
                  scrapedProducts.push(data[0]);
                  totalInserted++;
                }
              }
            } catch (productError) {
              console.error(`Error processing product ${productUrl}:`, productError);
            }
          }
        } catch (urlError) {
          console.error(`Error processing URL ${url}:`, urlError);
        }
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: `Successfully scraped and inserted ${totalInserted} products`,
      products: scrapedProducts
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in scraping function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
