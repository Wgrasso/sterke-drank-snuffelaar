
import { toast } from "sonner";
import { Product, ProductFilters } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { getStoreIdByName } from '../stores';

// Helper function to validate product image URLs
const validateImageUrl = (imageUrl: string): string => {
  // Always use the placeholder image to ensure consistent loading
  return "/placeholder.svg";
};

// Transform database row to Product type
const mapDbRowToProduct = (row: any): Product => {
  return {
    id: row.id,
    name: row.name,
    imageUrl: validateImageUrl(row.image_url),
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : undefined,
    store: {
      name: row.stores?.name || 'Unknown Store',
      logo: row.stores?.logo || '/placeholder.svg'
    },
    discountPercentage: row.discount_percentage,
    category: row.category,
    volume: row.volume,
    link: row.link
  };
};

export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  try {
    console.log('Fetching products with filters:', filters);
    
    let query = supabase
      .from('products')
      .select(`
        *,
        stores (
          name,
          logo
        )
      `);
    
    // Apply filters
    if (filters) {
      // Filter by category - use case-insensitive comparison
      if (filters.category) {
        query = query.ilike('category', `%${filters.category}%`);
      }
      
      // Filter by search
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      // Filter by price range
      if (filters.priceRange) {
        query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
      }
      
      // Filter by stores
      if (filters.stores && filters.stores.length > 0) {
        query = query.in('store_id', filters.stores);
      }

      // Filter by discount
      if (filters.onlyDiscounted) {
        query = query.not('original_price', 'is', null);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    // Log the raw data we received
    console.log('Products fetched raw data:', data);
    console.log('Number of products returned:', data?.length);
    
    // Transform database rows to Product objects
    return (data || []).map(mapDbRowToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Er ging iets mis bij het ophalen van de producten.');
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        stores (
          name,
          logo
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      throw new Error('Product niet gevonden');
    }
    
    return mapDbRowToProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    toast.error('Er ging iets mis bij het ophalen van het product.');
    return null;
  }
}

export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        stores (
          name,
          logo
        )
      `)
      .not('original_price', 'is', null)
      .order('discount_percentage', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return (data || []).map(mapDbRowToProduct);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Er ging iets mis bij het ophalen van de aanbevelingen.');
    return [];
  }
}

export async function fetchProductsByCategory(category: string, limit: number = 4): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        stores (
          name,
          logo
        )
      `)
      .ilike('category', category)
      .limit(limit);
    
    if (error) throw error;
    
    return (data || []).map(mapDbRowToProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    toast.error('Er ging iets mis bij het ophalen van de producten.');
    return [];
  }
}
