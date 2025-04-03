
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

// Helper function to extract data from HTML using regex
const extractWithRegex = (html: string, regex: RegExp, index = 1): string | null => {
  const match = html.match(regex)
  return match ? match[index] : null
}

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
  async gall(html: string, productUrl: string) {
    try {
      const name = extractWithRegex(html, /<h1[^>]*>(.*?)<\/h1>/i)
      const priceStr = extractWithRegex(html, /<span class="price"[^>]*>(.*?)<\/span>/i)
      const originalPriceStr = extractWithRegex(html, /<span class="old-price"[^>]*>(.*?)<\/span>/i)
      const volumeText = extractWithRegex(html, /<div class="volume"[^>]*>(.*?)<\/div>/i)
      
      // If we can't find the name, consider the page format changed
      if (!name) {
        console.error('Failed to extract product name from Gall & Gall page')
        return null
      }
      
      const price = priceStr ? normalizePrice(priceStr) : 0
      const originalPrice = originalPriceStr ? normalizePrice(originalPriceStr) : null
      const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0
      const volume = volumeText?.trim() || '70cl' // Default to 70cl if not found
      
      // Determine category from product name or URL
      let category = 'Overig' // Default category
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
      }
      
      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => 
          name.toLowerCase().includes(keyword) || 
          productUrl.toLowerCase().includes(keyword))) {
          category = cat
          break
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
      }
    } catch (error) {
      console.error(`Error parsing Gall & Gall product: ${error}`)
      return null
    }
  },
  
  // Albert Heijn scraper
  async ah(html: string, productUrl: string) {
    try {
      const name = extractWithRegex(html, /<h1[^>]*>(.*?)<\/h1>/i)
      const priceStr = extractWithRegex(html, /<span class="price"[^>]*>(.*?)<\/span>/i)
      const originalPriceStr = extractWithRegex(html, /<span class="was-price"[^>]*>(.*?)<\/span>/i)
      
      if (!name) {
        console.error('Failed to extract product name from Albert Heijn page')
        return null
      }
      
      const price = priceStr ? normalizePrice(priceStr) : 0
      const originalPrice = originalPriceStr ? normalizePrice(originalPriceStr) : null
      const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0
      
      // Extract volume from the product name
      let volume = '70cl' // Default value
      const volumeMatch = name.match(/(\d+\s*[cm]l)/i)
      if (volumeMatch) {
        volume = volumeMatch[1]
      }
      
      // Determine category from product name or URL
      let category = 'Overig' // Default category
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
      }
      
      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => 
          name.toLowerCase().includes(keyword) || 
          productUrl.toLowerCase().includes(keyword))) {
          category = cat
          break
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
      }
    } catch (error) {
      console.error(`Error parsing Albert Heijn product: ${error}`)
      return null
    }
  },
  
  // Similar functions for other stores can be added here
  async jumbo(html: string, productUrl: string) {
    // Similar implementation as above with Jumbo-specific selectors
    // Limited implementation for demo purposes
    try {
      const name = extractWithRegex(html, /<h1[^>]*>(.*?)<\/h1>/i)
      const priceStr = extractWithRegex(html, /<span class="jum-price"[^>]*>(.*?)<\/span>/i)
      const originalPriceStr = extractWithRegex(html, /<span class="jum-original-price"[^>]*>(.*?)<\/span>/i)
      
      if (!name) return null
      
      const price = priceStr ? normalizePrice(priceStr) : 0
      const originalPrice = originalPriceStr ? normalizePrice(originalPriceStr) : null
      const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0
      
      return {
        name,
        price,
        originalPrice,
        discountPercentage,
        volume: '70cl', // Default
        category: 'Overig', // Default
        imageUrl: '/placeholder.svg',
        link: productUrl,
        storeId: 'jumbo'
      }
    } catch (error) {
      console.error(`Error parsing Jumbo product: ${error}`)
      return null
    }
  },
  
  async dirk(html: string, productUrl: string) {
    // Basic implementation for Dirk
    try {
      const name = extractWithRegex(html, /<h1[^>]*>(.*?)<\/h1>/i)
      if (!name) return null
      
      return {
        name,
        price: 0, // Default as we can't extract it in this simple example
        volume: '70cl', // Default
        category: 'Overig', // Default
        imageUrl: '/placeholder.svg',
        link: productUrl,
        storeId: 'dirk'
      }
    } catch (error) {
      console.error(`Error parsing Dirk product: ${error}`)
      return null
    }
  },
  
  async mitra(html: string, productUrl: string) {
    // Basic implementation for Mitra
    try {
      const name = extractWithRegex(html, /<h1[^>]*>(.*?)<\/h1>/i)
      if (!name) return null
      
      return {
        name,
        price: 0, // Default as we can't extract it in this simple example
        volume: '70cl', // Default
        category: 'Overig', // Default
        imageUrl: '/placeholder.svg',
        link: productUrl,
        storeId: 'mitra'
      }
    } catch (error) {
      console.error(`Error parsing Mitra product: ${error}`)
      return null
    }
  }
}

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
}

// Function to scrape product URLs from a store's deals page
async function scrapeProductUrls(url: string, storeId: string): Promise<string[]> {
  try {
    console.log(`Fetching deals page: ${url}`)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
    }
    
    const html = await response.text()
    console.log(`Got HTML from ${url}, length: ${html.length}`)
    
    // Different regex patterns for different stores
    let urlPattern: RegExp
    
    switch(storeId) {
      case 'gall':
        urlPattern = /href="(https:\/\/www\.gall\.nl\/[^"]*\/p\/\d+)"/g
        break
      case 'ah':
        urlPattern = /href="(\/producten\/[^"]*\/[^"]*\/[^"]*)">/g
        break
      case 'jumbo':
        urlPattern = /href="(https:\/\/www\.jumbo\.com\/producten\/[^"]*)">/g
        break
      case 'dirk':
        urlPattern = /href="(https:\/\/www\.dirk\.nl\/producten\/[^"]*)">/g
        break
      case 'mitra':
        urlPattern = /href="(https:\/\/www\.mitra\.nl\/[^"]*)">/g
        break
      default:
        urlPattern = /href="([^"]*)">/g
    }
    
    const urls = new Set<string>()
    let match
    
    while ((match = urlPattern.exec(html)) !== null) {
      let productUrl = match[1]
      
      // Handle relative URLs
      if (productUrl.startsWith('/')) {
        const baseUrl = new URL(url).origin
        productUrl = baseUrl + productUrl
      }
      
      urls.add(productUrl)
    }
    
    console.log(`Found ${urls.size} product URLs for ${storeId}`)
    return Array.from(urls).slice(0, 20) // Limit to 20 products per page for demo
  } catch (error) {
    console.error(`Error scraping product URLs from ${url}:`, error)
    return []
  }
}

// Function to scrape a single product page
async function scrapeProductPage(url: string, storeId: string): Promise<any> {
  try {
    console.log(`Scraping product: ${url}`)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
    }
    
    const html = await response.text()
    
    // Call the appropriate scraper function
    const scraper = scrapers[storeId as keyof typeof scrapers]
    if (!scraper) {
      throw new Error(`No scraper implemented for store: ${storeId}`)
    }
    
    const product = await scraper(html, url)
    return product
  } catch (error) {
    console.error(`Error scraping product ${url}:`, error)
    return null
  }
}

// Main function to handle the HTTP request
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
  
  try {
    const requestData = await req.json()
    const { storeIds = ['gall', 'ah', 'jumbo', 'dirk', 'mitra'] } = requestData
    
    console.log(`Starting scraping for stores: ${storeIds.join(', ')}`)
    
    const scrapedProducts = []
    let totalInserted = 0
    
    // Process each store
    for (const storeId of storeIds) {
      console.log(`Processing store: ${storeId}`)
      
      // Check if store exists in the database
      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .single()
      
      if (storeError || !storeData) {
        console.error(`Store ${storeId} not found in database`, storeError)
        continue
      }
      
      const storeUrlList = storeUrls[storeId as keyof typeof storeUrls] || []
      
      for (const url of storeUrlList) {
        console.log(`Processing URL: ${url} for store ${storeId}`)
        
        // Get product URLs from the deals page
        const productUrls = await scrapeProductUrls(url, storeId)
        console.log(`Found ${productUrls.length} product URLs to process`)
        
        // Process each product URL (limited to first 5 for testing)
        for (const productUrl of productUrls.slice(0, 5)) {
          const productData = await scrapeProductPage(productUrl, storeId)
          
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
            }
            
            // Insert into database
            const { data, error } = await supabase
              .from('products')
              .insert(product)
              .select()
            
            if (error) {
              console.error(`Error inserting product ${productData.name}:`, error)
            } else {
              console.log(`Successfully inserted product: ${productData.name}`)
              scrapedProducts.push(data[0])
              totalInserted++
            }
          }
        }
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: `Successfully scraped and inserted ${totalInserted} products`,
      products: scrapedProducts
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('Error in scraping function:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
