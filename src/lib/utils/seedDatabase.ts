
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// This function can be called to populate the database with sample products
export async function seedProducts() {
  try {
    // Check if we already have products
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    // If we already have products, don't seed again
    if (count && count > 0) {
      console.log('Database already has products, skipping seed');
      return { success: true, message: 'Database already has products' };
    }
    
    // First we need to check if stores exist
    const { data: stores, error: storesError } = await supabase
      .from('stores')
      .select('*');
      
    if (storesError) throw storesError;
    
    // If no stores exist, create them
    if (!stores || stores.length === 0) {
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
        
      if (insertStoresError) throw insertStoresError;
    }
    
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
      },
      {
        name: 'Bacardi Carta Blanca',
        image_url: '/placeholder.svg',
        price: 18.99,
        original_price: 22.99,
        discount_percentage: 17,
        category: 'Rum',
        volume: '70cl',
        link: 'https://www.dirk.nl/producten/bacardi-carta-blanca-70cl-123456',
        store_id: 'dirk'
      },
      {
        name: 'Jack Daniel\'s Tennessee Whiskey',
        image_url: '/placeholder.svg',
        price: 29.99,
        original_price: 34.99,
        discount_percentage: 14,
        category: 'Whisky',
        volume: '100cl',
        link: 'https://www.mitra.nl/producten/jack-daniels-tennessee-whiskey-100cl-123456',
        store_id: 'mitra'
      },
      {
        name: 'Hendrick\'s Gin',
        image_url: '/placeholder.svg',
        price: 36.99,
        original_price: 42.99,
        discount_percentage: 14,
        category: 'Gin',
        volume: '70cl',
        link: 'https://www.gall.nl/producten/hendricks-gin-70cl-123456',
        store_id: 'gall'
      },
      {
        name: 'Grey Goose Vodka',
        image_url: '/placeholder.svg',
        price: 39.99,
        original_price: 46.99,
        discount_percentage: 15,
        category: 'Vodka',
        volume: '70cl',
        link: 'https://www.ah.nl/producten/grey-goose-vodka-70cl-123456',
        store_id: 'ah'
      },
      {
        name: 'Talisker 10 Years',
        image_url: '/placeholder.svg',
        price: 42.99,
        original_price: 49.99,
        discount_percentage: 14,
        category: 'Whisky',
        volume: '70cl',
        link: 'https://www.jumbo.com/producten/talisker-10-years-70cl-123456',
        store_id: 'jumbo'
      },
      {
        name: 'Cointreau',
        image_url: '/placeholder.svg',
        price: 22.99,
        original_price: 27.99,
        discount_percentage: 18,
        category: 'Likeur',
        volume: '70cl',
        link: 'https://www.dirk.nl/producten/cointreau-70cl-123456',
        store_id: 'dirk'
      },
      {
        name: 'Remy Martin VSOP',
        image_url: '/placeholder.svg',
        price: 44.99,
        original_price: 52.99,
        discount_percentage: 15,
        category: 'Cognac',
        volume: '70cl',
        link: 'https://www.mitra.nl/producten/remy-martin-vsop-70cl-123456',
        store_id: 'mitra'
      }
    ];
    
    // Insert sample products
    const { error } = await supabase
      .from('products')
      .insert(sampleProducts);
    
    if (error) throw error;
    
    console.log('Successfully seeded database with sample products');
    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Error seeding database:', error);
    toast.error('Er ging iets mis bij het vullen van de database.');
    return { success: false, message: 'Error seeding database' };
  }
}
