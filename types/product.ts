export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  categorySlug: string;
  inStock: boolean;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  badges?: ProductBadge[];
  tags?: string[];
  specifications?: Record<string, string>;
}

export type ProductBadge = 
  | 'bestSeller' 
  | 'newProduct' 
  | 'vegan' 
  | 'alcoholFree' 
  | 'perfumeFree'
  | 'hairGrowth'
  | 'sale';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: Category[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

