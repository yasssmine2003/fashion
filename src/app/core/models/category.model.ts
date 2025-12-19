// src/app/core/models/category.model.ts
export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    parentId?: number;
    featured: boolean;
    productCount: number;
    subcategories?: Category[];
    metaTitle?: string;
    metaDescription?: string;
  }
  
  export interface CategoryTree {
    category: Category;
    children: CategoryTree[];
  }