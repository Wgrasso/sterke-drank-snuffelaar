
import { toast } from "sonner";
import { Product } from "../types";
import { getStoreIdByName } from "../stores";

interface ScraperResult {
  success: boolean;
  product?: Partial<Product>;
  error?: string;
}

export async function scrapeProductUrl(url: string): Promise<ScraperResult> {
  // For real implementations, this would use a backend service
  // Since we're frontend-only, we'll use a basic fetch with CORS proxy for demo purposes
  
  try {
    // In a real implementation, this would be a backend API call
    // For demo purposes, we're using a CORS proxy (not reliable for production)
    const corsProxy = "https://corsproxy.io/?";
    const response = await fetch(`${corsProxy}${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Create a temporary element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // Example extraction logic for drankdozijn.nl
    if (url.includes("drankdozijn.nl")) {
      const name = doc.querySelector("h1")?.textContent?.trim() || "";
      
      // Price extraction (actual implementation would be more robust)
      let price = 0;
      let originalPrice = 0;
      const priceText = doc.querySelector(".product-price")?.textContent?.trim() || "";
      const oldPriceText = doc.querySelector(".old-price")?.textContent?.trim() || "";
      
      // Extract numbers from strings
      const priceMatch = priceText.match(/[0-9]+[,.][0-9]+/);
      const oldPriceMatch = oldPriceText.match(/[0-9]+[,.][0-9]+/);
      
      if (priceMatch) {
        price = parseFloat(priceMatch[0].replace(",", "."));
      }
      
      if (oldPriceMatch) {
        originalPrice = parseFloat(oldPriceMatch[0].replace(",", "."));
      }
      
      // Calculate discount percentage if both prices exist
      let discountPercentage = 0;
      if (originalPrice > 0 && price > 0) {
        discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
      }
      
      // Image URL
      const imageSrc = doc.querySelector(".product-image img")?.getAttribute("src") || "";
      
      // Volume extraction - would be more robust in real implementation
      const volumeMatch = name.match(/(\d+)\s*(cl|ml|liter|ltr)/i);
      let volume = "";
      if (volumeMatch) {
        volume = volumeMatch[0];
      }
      
      // Category extraction - would need specific selectors in real implementation
      const category = doc.querySelector(".breadcrumbs li:nth-child(2)")?.textContent?.trim() || "Onbekend";
      
      return {
        success: true,
        product: {
          name,
          price,
          originalPrice: originalPrice || undefined,
          discountPercentage: discountPercentage || undefined,
          imageUrl: imageSrc,
          volume,
          category,
          link: url
        }
      };
    }
    
    // Add support for other stores here
    
    return {
      success: false,
      error: "Unsupported website. Currently only drankdozijn.nl is supported."
    };
    
  } catch (error) {
    console.error("Scraping error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to scrape product"
    };
  }
}

export async function compareProductWithDatabase(
  scrapedProduct: Partial<Product>, 
  existingProduct?: Product
): Promise<{ isMatch: boolean; differences: string[] }> {
  const differences: string[] = [];
  
  if (!existingProduct) {
    return { isMatch: false, differences: ["Product not in database"] };
  }
  
  // Compare name
  if (scrapedProduct.name && scrapedProduct.name !== existingProduct.name) {
    differences.push(`Name: "${existingProduct.name}" ➔ "${scrapedProduct.name}"`);
  }
  
  // Compare price
  if (scrapedProduct.price && Math.abs(scrapedProduct.price - existingProduct.price) > 0.01) {
    differences.push(`Price: €${existingProduct.price.toFixed(2)} ➔ €${scrapedProduct.price.toFixed(2)}`);
  }
  
  // Compare original price
  if (scrapedProduct.originalPrice && existingProduct.originalPrice && 
      Math.abs(scrapedProduct.originalPrice - existingProduct.originalPrice) > 0.01) {
    differences.push(`Original price: €${existingProduct.originalPrice.toFixed(2)} ➔ €${scrapedProduct.originalPrice.toFixed(2)}`);
  }
  
  // Compare discount percentage
  if (scrapedProduct.discountPercentage !== undefined && 
      scrapedProduct.discountPercentage !== existingProduct.discountPercentage) {
    differences.push(`Discount: ${existingProduct.discountPercentage || 0}% ➔ ${scrapedProduct.discountPercentage}%`);
  }
  
  // Compare volume
  if (scrapedProduct.volume && scrapedProduct.volume !== existingProduct.volume) {
    differences.push(`Volume: ${existingProduct.volume} ➔ ${scrapedProduct.volume}`);
  }
  
  // Compare category
  if (scrapedProduct.category && scrapedProduct.category !== existingProduct.category) {
    differences.push(`Category: ${existingProduct.category} ➔ ${scrapedProduct.category}`);
  }
  
  // Compare image URL (just check if it's different, not the exact URL for simplicity)
  if (scrapedProduct.imageUrl && scrapedProduct.imageUrl !== existingProduct.imageUrl) {
    differences.push(`Image URL has changed`);
  }
  
  return {
    isMatch: differences.length === 0,
    differences
  };
}
