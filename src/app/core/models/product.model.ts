// src/app/core/models/product.model.ts
export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[]; // URLs des images
    stock: number;
    brand: string;
    rating: number;
    reviews: number;
    
    // Filtres
    category: string;
    subcategory?: string;
    sizes: string[];
    colors: string[];
    tags: string[];
    
    // Métadonnées
    newArrival: boolean;
    trending: boolean;
    bestSeller: boolean;
    featured: boolean;
    
    // Spécifications
    material?: string;
    careInstructions?: string;
    dimensions?: string;
    weight?: number;
    
    // SEO
    metaTitle?: string;
    metaDescription?: string;
    
    // Dates
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ProductFilter {
    categories?: string[];
    priceRange?: { min: number; max: number };
    sizes?: string[];
    colors?: string[];
    brands?: string[];
    ratings?: number[];
    sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'name';
    inStock?: boolean;
    onSale?: boolean;
    newArrivals?: boolean;
    trending?: boolean;
  }