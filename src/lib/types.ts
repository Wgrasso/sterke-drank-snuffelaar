
export interface Store {
  name: string;
  logo: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  store: Store;
  discountPercentage?: number;
  category: string;
  volume: string;
  link: string;
}

export type ProductCategory = 'Whisky' | 'Vodka' | 'Rum' | 'Gin' | 'Likeur' | 'Cognac' | 'Brandy' | 'Tequila' | 'Bier' | 'Wijn';

export interface ProductFilters {
  category?: string;
  search?: string;
  priceRange?: [number, number];
  stores?: string[];
  onlyDiscounted?: boolean;
}
