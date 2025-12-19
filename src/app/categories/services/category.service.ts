// src/app/categories/services/category.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, CategoryTree } from '@core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private categories: Category[] = [
    {
      id: 1,
      name: 'Robes',
      slug: 'robes',
      description: 'Collection de robes pour toutes les occasions',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop',
      featured: true,
      productCount: 24,
      subcategories: [
        { id: 101, name: 'Robes d\'Été', slug: 'robes-ete', description: '', image: '', featured: false, productCount: 12 },
        { id: 102, name: 'Robes de Soirée', slug: 'robes-soiree', description: '', image: '', featured: false, productCount: 6 },
        { id: 103, name: 'Robes Midi', slug: 'robes-midi', description: '', image: '', featured: false, productCount: 4 },
        { id: 104, name: 'Robes Longues', slug: 'robes-longues', description: '', image: '', featured: false, productCount: 2 }
      ]
    },
    {
      id: 2,
      name: 'Hauts',
      slug: 'hauts',
      description: 'T-shirts, chemisiers, pulls et plus',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
      featured: true,
      productCount: 42,
      subcategories: [
        { id: 201, name: 'T-shirts', slug: 't-shirts', description: '', image: '', featured: false, productCount: 18 },
        { id: 202, name: 'Chemisiers', slug: 'chemisiers', description: '', image: '', featured: false, productCount: 12 },
        { id: 203, name: 'Pulls', slug: 'pulls', description: '', image: '', featured: false, productCount: 8 },
        { id: 204, name: 'Sweats', slug: 'sweats', description: '', image: '', featured: false, productCount: 4 }
      ]
    },
    {
      id: 3,
      name: 'Pantalons',
      slug: 'pantalons',
      description: 'Jeans, pantalons tailleur, leggings',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop',
      featured: true,
      productCount: 36,
      subcategories: [
        { id: 301, name: 'Jeans', slug: 'jeans', description: '', image: '', featured: false, productCount: 20 },
        { id: 302, name: 'Pantalons Taille Haute', slug: 'pantalons-taille-haute', description: '', image: '', featured: false, productCount: 10 },
        { id: 303, name: 'Leggings', slug: 'leggings', description: '', image: '', featured: false, productCount: 6 }
      ]
    },
    {
      id: 4,
      name: 'Jupes',
      slug: 'jupes',
      description: 'Jupes courtes, midi et longues',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop',
      featured: true,
      productCount: 18,
      subcategories: [
        { id: 401, name: 'Jupes Midi', slug: 'jupes-midi', description: '', image: '', featured: false, productCount: 10 },
        { id: 402, name: 'Jupes Courtes', slug: 'jupes-courtes', description: '', image: '', featured: false, productCount: 5 },
        { id: 403, name: 'Jupes Longues', slug: 'jupes-longues', description: '', image: '', featured: false, productCount: 3 }
      ]
    },
    {
      id: 5,
      name: 'Vestes',
      slug: 'vestes',
      description: 'Blazers, vestes en cuir, gilets',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
      featured: true,
      productCount: 15,
      subcategories: [
        { id: 501, name: 'Blazers', slug: 'blazers', description: '', image: '', featured: false, productCount: 6 },
        { id: 502, name: 'Vestes en Cuir', slug: 'vestes-cuir', description: '', image: '', featured: false, productCount: 4 },
        { id: 503, name: 'Gilets', slug: 'gilets', description: '', image: '', featured: false, productCount: 5 }
      ]
    },
    {
      id: 6,
      name: 'Manteaux',
      slug: 'manteaux',
      description: 'Trenchs, doudounes, manteaux d\'hiver',
      image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&auto=format&fit=crop',
      featured: true,
      productCount: 12,
      subcategories: [
        { id: 601, name: 'Trenchs', slug: 'trenchs', description: '', image: '', featured: false, productCount: 4 },
        { id: 602, name: 'Doudounes', slug: 'doudounes', description: '', image: '', featured: false, productCount: 5 },
        { id: 603, name: 'Manteaux d\'Hiver', slug: 'manteaux-hiver', description: '', image: '', featured: false, productCount: 3 }
      ]
    },
    {
      id: 7,
      name: 'Accessoires',
      slug: 'accessoires',
      description: 'Sacs, bijoux, écharpes et plus',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop',
      featured: false,
      productCount: 58,
      subcategories: [
        { id: 701, name: 'Sacs', slug: 'sacs', description: '', image: '', featured: false, productCount: 25 },
        { id: 702, name: 'Bijoux', slug: 'bijoux', description: '', image: '', featured: false, productCount: 20 },
        { id: 703, name: 'Écharpes', slug: 'echarpes', description: '', image: '', featured: false, productCount: 8 },
        { id: 704, name: 'Chapeaux', slug: 'chapeaux', description: '', image: '', featured: false, productCount: 5 }
      ]
    },
    {
      id: 8,
      name: 'Chaussures',
      slug: 'chaussures',
      description: 'Baskets, talons, bottes et sandales',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop',
      featured: false,
      productCount: 32,
      subcategories: [
        { id: 801, name: 'Baskets', slug: 'baskets', description: '', image: '', featured: false, productCount: 12 },
        { id: 802, name: 'Talons', slug: 'talons', description: '', image: '', featured: false, productCount: 10 },
        { id: 803, name: 'Bottes', slug: 'bottes', description: '', image: '', featured: false, productCount: 6 },
        { id: 804, name: 'Sandales', slug: 'sandales', description: '', image: '', featured: false, productCount: 4 }
      ]
    }
  ];

  constructor() {}

  getAllCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getFeaturedCategories(): Observable<Category[]> {
    const featured = this.categories.filter(category => category.featured);
    return of(featured);
  }

  getCategoryBySlug(slug: string): Observable<Category | undefined> {
    const category = this.categories.find(c => c.slug === slug);
    return of(category);
  }

  getCategoryTree(): Observable<CategoryTree[]> {
    const mainCategories = this.categories.filter(c => !c.parentId);
    const tree: CategoryTree[] = mainCategories.map(category => ({
      category,
      children: this.getChildren(category.id)
    }));
    return of(tree);
  }

  private getChildren(parentId: number): CategoryTree[] {
    const children = this.categories.filter(c => c.parentId === parentId);
    return children.map(child => ({
      category: child,
      children: this.getChildren(child.id)
    }));
  }
}