// product.model.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    slug: string;
    description?: string;
    
    // Rendez certaines propriétés obligatoires si elles sont utilisées
    images: string[];  // Pas optionnel
    stock: number;     // Pas optionnel
    brand: string;     // Pas optionnel
    rating: number;    // Pas optionnel
    
    // Gardez ceux-ci optionnels
    newArrival?: boolean;
    trending?: boolean;
    reviews?: number;
    colors?: string[];
  }