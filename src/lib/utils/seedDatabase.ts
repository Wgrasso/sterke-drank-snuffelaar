
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// This function can be called to populate the database with sample products
export async function seedProducts() {
  try {
    console.log('Starting database seed process...');
    
    // Check if we already have products
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking product count:', countError);
      throw countError;
    }
    
    console.log('Current product count:', count);
    
    // If we already have products, don't seed again
    if (count && count > 0) {
      console.log('Database already has products, skipping seed');
      return { success: true, message: 'Database already has products' };
    }
    
    // First we need to check if stores exist
    const { data: stores, error: storesError } = await supabase
      .from('stores')
      .select('*');
      
    if (storesError) {
      console.error('Error checking stores:', storesError);
      throw storesError;
    }
    
    console.log('Existing stores:', stores);
    
    // If no stores exist, create them
    if (!stores || stores.length === 0) {
      console.log('No stores found, creating stores...');
      const storeData = [
        { id: 'gall', name: 'Gall & Gall', logo: '/gall-logo.svg' },
        { id: 'ah', name: 'Albert Heijn', logo: '/ah-logo.svg' },
        { id: 'jumbo', name: 'Jumbo', logo: '/jumbo-logo.svg' },
        { id: 'dirk', name: 'Dirk', logo: '/dirk-logo.svg' },
        { id: 'mitra', name: 'Mitra', logo: '/mitra-logo.svg' }
      ];
      
      const { error: insertStoresError } = await supabase
        .from('stores')
        .insert(storeData);
        
      if (insertStoresError) {
        console.error('Error inserting stores:', insertStoresError);
        throw insertStoresError;
      }
      
      console.log('Stores created successfully');
    }
    
    console.log('Inserting sample products...');
    
    // Create a single simple product for testing
    const testProduct = {
      name: 'Test Product',
      image_url: '/placeholder.svg',
      price: 19.99,
      original_price: 29.99,
      discount_percentage: 33,
      category: 'Test',
      volume: '70cl',
      link: 'https://example.com/product',
      store_id: 'gall'
    };
    
    // Try to insert a single product to test if insertion works
    const { data: testData, error: testError } = await supabase
      .from('products')
      .insert(testProduct)
      .select();
    
    if (testError) {
      console.error('Test product insertion failed:', testError);
      // Let's try inserting with admin role if available or different method
      toast.error('Er ging iets mis bij het vullen van de database. Probeer later opnieuw.');
      return { 
        success: false, 
        message: `Test product insertion failed: ${testError.message}`,
        error: testError 
      };
    }
    
    console.log('Test product inserted successfully:', testData);
    
    // Now add some more realistic products
    const sampleProducts = [
      {
        name: 'Bombay Sapphire Gin',
        image_url: '/placeholder.svg',
        price: 29.99,
        original_price: 36.99,
        discount_percentage: 19,
        category: 'Gin',
        volume: '100cl',
        link: 'https://www.gall.nl/artikel/fles-bombay-sapphire-gin-1ltr',
        store_id: 'gall'
      },
      {
        name: 'Jameson Irish Whiskey',
        image_url: '/placeholder.svg',
        price: 24.99,
        original_price: 29.99,
        discount_percentage: 17,
        category: 'Whisky',
        volume: '70cl',
        link: 'https://www.ah.nl/producten/product/wi231599/jameson-irish-whiskey',
        store_id: 'ah'
      },
      {
        name: 'Absolut Vodka',
        image_url: '/placeholder.svg',
        price: 19.99,
        original_price: 23.99,
        discount_percentage: 16,
        category: 'Vodka',
        volume: '70cl',
        link: 'https://www.jumbo.com/producten/absolut-vodka-70cl-123456',
        store_id: 'jumbo'
      }
    ];
    
    // Insert main products batch
    const { data: mainData, error: mainError } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();
    
    if (mainError) {
      console.error('Error inserting main products:', mainError);
      // We already have the test product, so don't report failure
      toast.success(`Database gevuld met 1 voorbeeldproduct`);
      return { 
        success: true, 
        message: `Database seeded with test product only. Main products insertion failed: ${mainError.message}`,
        data: testData
      };
    }
    
    const allProducts = [...(testData || []), ...(mainData || [])];
    console.log(`Successfully seeded database with ${allProducts.length} products`);
    toast.success(`Database succesvol gevuld met ${allProducts.length} voorbeeldproducten`);
    
    return { 
      success: true, 
      message: `Database seeded successfully with ${allProducts.length} products`, 
      data: allProducts
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    toast.error('Er ging iets mis bij het vullen van de database.');
    return { 
      success: false, 
      message: `Error seeding database: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}
