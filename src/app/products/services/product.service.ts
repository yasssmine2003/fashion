// src/app/products/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product, ProductFilter } from '@core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'api/products'; // À remplacer par votre API réelle
  private productsCache = new Map<string, Product[]>();

  // Données mockées (images fashion assorties au thème)
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Robe Élégante Florale',
      slug: 'robe-elegante-florale',
      description: 'Robe d\'été légère avec motif floral, parfaite pour les occasions spéciales.',
      price: 89.99,
      originalPrice: 119.99,
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w-800&auto=format&fit=crop'
      ],
      stock: 15,
      brand: 'Fashion Élégance',
      rating: 4.5,
      reviews: 128,
      category: 'Robes',
      subcategory: 'Robes d\'Été',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Rose', 'Blanc', 'Bleu'],
      tags: ['été', 'floral', 'élégant', 'soirée'],
      newArrival: true,
      trending: true,
      bestSeller: true,
      featured: true,
      material: 'Coton et polyester',
      careInstructions: 'Lavage à la main recommandé',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Blazer Structuré ',
      slug: 'blazer-structure',
      description: 'Blazer professionnel noir avec coupe structurée pour un look sophistiqué.',
      price: 129.99,
      images: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1539533113206-8c8b5898b643?w=800&auto=format&fit=crop'
      ],
      stock: 8,
      brand: 'Urban Chic',
      rating: 4.8,
      reviews: 95,
      category: 'Vestes',
      subcategory: 'Blazers',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Noir', 'Marine', 'Gris'],
      tags: ['professionnel', 'bureau', 'chic', 'moderne'],
      newArrival: false,
      trending: true,
      bestSeller: true,
      featured: false,
      material: 'Laine et élasthanne',
      createdAt: new Date('2023-11-20'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: 3,
      name: 'Jeans Slim Déchirés',
      slug: 'jeans-slim-dechires',
      description: 'Jeans slim déchirés à la mode pour un look décontracté et tendance.',
      price: 79.99,
      originalPrice: 99.99,
      images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop'
      ],
      stock: 22,
      brand: 'Denim Rebel',
      rating: 4.3,
      reviews: 210,
      category: 'Pantalons',
      subcategory: 'Jeans',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Bleu clair', 'Bleu foncé', 'Noir'],
      tags: ['décontracté', 'streetwear', 'tendance', 'jeans'],
      newArrival: false,
      trending: false,
      bestSeller: true,
      featured: true,
      material: 'Denim',
      createdAt: new Date('2023-10-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: 4,
      name: 'Sweat-shirt Oversize',
      slug: 'sweat-shirt-oversize',
      description: 'Sweat-shirt confortable oversize avec logo brodé, parfait pour les jours relax.',
      price: 49.99,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop'
      ],
      stock: 35,
      brand: 'Comfy Wear',
      rating: 4.7,
      reviews: 178,
      category: 'Hauts',
      subcategory: 'Sweats',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Gris', 'Noir', 'Bordeaux'],
      tags: ['confort', 'décontracté', 'quotidien', 'oversize'],
      newArrival: true,
      trending: true,
      bestSeller: false,
      featured: true,
      material: 'Coton',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 5,
      name: 'Jupe Midi Plissée',
      slug: 'jupe-midi-plissee',
      description: 'Jupe midi plissée élégante pour un look féminin et raffiné.',
      price: 65.99,
      originalPrice: 85.99,
      images: [
        'https://stylee.fr/wp-content/uploads/jupe-midi-plissee-tie-dye-Gerard-Darel.png',
        'https://stylee.fr/wp-content/uploads/jupe-midi-plissee-tie-dye-Gerard-Darel.png'
      ],
      stock: 12,
      brand: 'Feminine Style',
      rating: 4.6,
      reviews: 92,
      category: 'Jupes',
      subcategory: 'Jupes Midi',
      sizes: ['XS', 'S', 'M'],
      colors: ['Beige', 'Noir', 'Bleu poudre'],
      tags: ['élégant', 'féminin', 'travail', 'soirée'],
      newArrival: false,
      trending: true,
      bestSeller: false,
      featured: false,
      material: 'Polyester',
      createdAt: new Date('2023-12-10'),
      updatedAt: new Date('2024-01-08')
    },
    {
      id: 6,
      name: 'Manteau Trench Camel',
      slug: 'manteau-trench-camel',
      description: 'Manteau trench classique en couleur camel, indispensable pour toute garde-robe.',
      price: 189.99,
      images: [
        'https://media.istockphoto.com/id/1416182977/photo/beautiful-young-blonde-woman-in-an-orange-trench-coat-among-the-horses-at-the-horse-farm.jpg?s=2048x2048&w=is&k=20&c=qeo4bV8E-OOM3nqiK8UlaBL-26hvYegmPEsbsGUPNOs=',
        'https://media.istockphoto.com/id/1416182977/photo/beautiful-young-blonde-woman-in-an-orange-trench-coat-among-the-horses-at-the-horse-farm.jpg?s=2048x2048&w=is&k=20&c=qeo4bV8E-OOM3nqiK8UlaBL-26hvYegmPEsbsGUPNOs='
      ],
      stock: 6,
      brand: 'Classic Coat',
      rating: 4.9,
      reviews: 56,
      category: 'Manteaux',
      subcategory: 'Trenchs',
      sizes: ['S', 'M', 'L'],
      colors: ['Camel', 'Noir', 'Marine'],
      tags: ['classique', 'intemporel', 'automne', 'printemps'],
      newArrival: true,
      trending: false,
      bestSeller: true,
      featured: true,
      material: 'Coton imperméable',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
        // ... produits existants ...
        
        // PRODUITS SUPPLÉMENTAIRES (8 nouveaux)
        {
          id: 7,
          name: 'Chemisier Soie Brodé',
          slug: 'chemisier-soie-brode',
          description: 'Chemisier élégant en soie avec broderies délicates, parfait pour les occasions spéciales.',
          price: 119.99,
          images: [
            'https://i.etsystatic.com/20157170/c/1916/1916/205/0/il/b74510/5826375990/il_300x300.5826375990_q0yw.jpg',
            'https://i.etsystatic.com/20157170/c/1916/1916/205/0/il/b74510/5826375990/il_300x300.5826375990_q0yw.jpg'
          ],
          stock: 9,
          brand: 'Luxe Silk',
          rating: 4.8,
          reviews: 67,
          category: 'Hauts',
          subcategory: 'Chemisiers',
          sizes: ['XS', 'S', 'M', 'L'],
          colors: ['Blanc', 'Crème', 'Rose pâle'],
          tags: ['soie', 'élégant', 'broderie', 'soirée'],
          newArrival: true,
          trending: true,
          bestSeller: false,
          featured: true,
          material: 'Soie 100%',
          careInstructions: 'Nettoyage à sec uniquement',
          createdAt: new Date('2024-01-25'),
          updatedAt: new Date('2024-01-25')
        },
        {
          id: 8,
          name: 'Pantalon Taille Haute',
          slug: 'pantalon-taille-haute',
          description: 'Pantalon taille haute en lin pour un look chic et confortable.',
          price: 89.99,
          originalPrice: 109.99,
          images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop'
          ],
          stock: 18,
          brand: 'Modern Basics',
          rating: 4.4,
          reviews: 142,
          category: 'Pantalons',
          subcategory: 'Pantalons Taille Haute',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Beige', 'Noir', 'Marine'],
          tags: ['lin', 'confortable', 'bureau', 'chic'],
          newArrival: false,
          trending: true,
          bestSeller: true,
          featured: false,
          material: 'Lin',
          createdAt: new Date('2023-11-15'),
          updatedAt: new Date('2024-01-12')
        },
        {
          id: 9,
          name: 'Ensemble Jogging Premium',
          slug: 'ensemble-jogging-premium',
          description: 'Ensemble jogging premium pour un style décontracté mais raffiné.',
          price: 129.99,
          images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdecZFtyDwFBFRTv0BnenoySYHHxGLaCfck9u3UDoyc6q1nAgfLsp0ilAMIUnopFBtNiw&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdecZFtyDwFBFRTv0BnenoySYHHxGLaCfck9u3UDoyc6q1nAgfLsp0ilAMIUnopFBtNiw&usqp=CAU'
          ],
          stock: 25,
          brand: 'Athleisure',
          rating: 4.7,
          reviews: 89,
          category: 'Ensembles',
          subcategory: 'Joggings',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Gris', 'Noir', 'Bordeaux'],
          tags: ['décontracté', 'sportswear', 'confort', 'quotidien'],
          newArrival: true,
          trending: true,
          bestSeller: false,
          featured: true,
          material: 'Coton et polyester',
          createdAt: new Date('2024-01-18'),
          updatedAt: new Date('2024-01-18')
        },
        {
          id: 10,
          name: 'Veste en Cuir Moto',
          slug: 'veste-cuir-moto',
          description: 'Veste en cuir véritable style moto pour un look audacieux.',
          price: 249.99,
          originalPrice: 299.99,
          images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&auto=format&fit=crop'
          ],
          stock: 7,
          brand: 'Leather Rebel',
          rating: 4.9,
          reviews: 203,
          category: 'Vestes',
          subcategory: 'Vestes en Cuir',
          sizes: ['XS', 'S', 'M', 'L'],
          colors: ['Noir', 'Marron', 'Bordeaux'],
          tags: ['cuir', 'moto', 'audacieux', 'intemporel'],
          newArrival: false,
          trending: false,
          bestSeller: true,
          featured: true,
          material: 'Cuir véritable',
          createdAt: new Date('2023-10-20'),
          updatedAt: new Date('2024-01-05')
        },
        
        {
          id: 12,
          name: 'Short en Denim Déchiré',
          slug: 'short-denim-dechire',
          description: 'Short en denim déchiré pour un look décontracté estival.',
          price: 59.99,
          originalPrice: 79.99,
          images: [
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop'
          ],
          stock: 32,
          brand: 'Summer Vibes',
          rating: 4.3,
          reviews: 178,
          category: 'Shorts',
          subcategory: 'Shorts Denim',
          sizes: ['26', '28', '30', '32'],
          colors: ['Bleu clair', 'Bleu foncé', 'Noir'],
          tags: ['été', 'décontracté', 'denim', 'plage'],
          newArrival: false,
          trending: true,
          bestSeller: true,
          featured: false,
          material: 'Denim',
          createdAt: new Date('2023-12-01'),
          updatedAt: new Date('2024-01-08')
        },
        {
          id: 13,
          name: 'Robe de Soirée Longue',
          slug: 'robe-soiree-longue',
          description: 'Robe de soirée longue et élégante pour les occasions spéciales.',
          price: 299.99,
          images: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop'
          ],
          stock: 5,
          brand: 'Evening Glam',
          rating: 4.9,
          reviews: 45,
          category: 'Robes',
          subcategory: 'Robes de Soirée',
          sizes: ['XS', 'S', 'M'],
          colors: ['Noir', 'Rouge', 'Or'],
          tags: ['soirée', 'élégant', 'cérémonie', 'luxe'],
          newArrival: true,
          trending: false,
          bestSeller: false,
          featured: true,
          material: 'Satin et dentelle',
          careInstructions: 'Nettoyage à sec uniquement',
          createdAt: new Date('2024-01-30'),
          updatedAt: new Date('2024-01-30')
        },
        {
          id: 14,
          name: 'Gilet en Laine Cardigan',
          slug: 'gilet-laine-cardigan',
          description: 'Gilet cardigan en laine pour un look chaleureux et sophistiqué.',
          price: 89.99,
          images: [
            'https://images.unsplash.com/photo-1539533113206-8c8b5898b643?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop'
          ],
          stock: 21,
          brand: 'Cozy Knits',
          rating: 4.6,
          reviews: 112,
          category: 'Gilets',
          subcategory: 'Cardigans',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Gris chiné', 'Bordeaux', 'Marine'],
          tags: ['laine', 'confort', 'automne', 'hiver'],
          newArrival: false,
          trending: true,
          bestSeller: true,
          featured: false,
          material: 'Laine mérinos',
          createdAt: new Date('2023-11-10'),
          updatedAt: new Date('2024-01-15')
        }
      
  ];

  constructor(private http: HttpClient) {}

  getProducts(filter?: ProductFilter, page = 1, limit = 12): Observable<{ products: Product[]; total: number }> {
    // Pour le moment, retourne les données mockées
    // À remplacer par un appel API réel
    let filteredProducts = [...this.mockProducts];

    if (filter) {
      filteredProducts = this.applyFilters(filteredProducts, filter);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return of({
      products: paginatedProducts,
      total: filteredProducts.length
    });
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.slug === slug);
    return of(product);
  }

  getFeaturedProducts(limit = 6): Observable<Product[]> {
    const featured = this.mockProducts
      .filter(p => p.featured)
      .slice(0, limit);
    return of(featured);
  }

  getNewArrivals(limit = 8): Observable<Product[]> {
    const newArrivals = this.mockProducts
      .filter(p => p.newArrival)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
    return of(newArrivals);
  }

  getTrendingProducts(limit = 6): Observable<Product[]> {
    const trending = this.mockProducts
      .filter(p => p.trending)
      .slice(0, limit);
    return of(trending);
  }

  searchProducts(query: string): Observable<Product[]> {
    const searchTerm = query.toLowerCase();
    const results = this.mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    return of(results);
  }

  getRelatedProducts(productId: number, limit = 4): Observable<Product[]> {
    const product = this.mockProducts.find(p => p.id === productId);
    if (!product) return of([]);

    const related = this.mockProducts
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || 
         p.tags.some(tag => product.tags.includes(tag)))
      )
      .slice(0, limit);

    return of(related);
  }

  private applyFilters(products: Product[], filter: ProductFilter): Product[] {
    return products.filter(product => {
      // Filtre par catégorie
      if (filter.categories && filter.categories.length > 0) {
        if (!filter.categories.includes(product.category)) return false;
      }

      // Filtre par prix
      if (filter.priceRange) {
        if (product.price < filter.priceRange.min || product.price > filter.priceRange.max) return false;
      }

      // Filtre par tailles
      if (filter.sizes && filter.sizes.length > 0) {
        if (!filter.sizes.some(size => product.sizes.includes(size))) return false;
      }

      // Filtre par couleurs
      if (filter.colors && filter.colors.length > 0) {
        if (!filter.colors.some(color => product.colors.includes(color))) return false;
      }

      // Filtre par marques
      if (filter.brands && filter.brands.length > 0) {
        if (!filter.brands.includes(product.brand)) return false;
      }

      // Filtre par notation
      if (filter.ratings && filter.ratings.length > 0) {
        if (!filter.ratings.some(rating => Math.floor(product.rating) === rating)) return false;
      }

      // Filtre par stock
      if (filter.inStock === true && product.stock === 0) return false;

      // Filtre par promotions
      if (filter.onSale === true && !product.originalPrice) return false;

      // Filtre par nouveautés
      if (filter.newArrivals === true && !product.newArrival) return false;

      // Filtre par tendances
      if (filter.trending === true && !product.trending) return false;

      return true;
    }).sort((a, b) => {
      // Tri
      if (!filter.sortBy) return 0;

      switch (filter.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }
  // Ajoutez dans product.service.ts
getProductsByCategory(categorySlug: string, filter?: ProductFilter, page = 1, limit = 12): Observable<{ products: Product[]; total: number }> {
    let filteredProducts = this.mockProducts.filter(p => 
      p.category.toLowerCase() === categorySlug.toLowerCase() ||
      p.subcategory?.toLowerCase() === categorySlug.toLowerCase()
    );
  
    if (filter) {
      filteredProducts = this.applyFilters(filteredProducts, filter);
    }
  
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
    return of({
      products: paginatedProducts,
      total: filteredProducts.length
    });
  }
}
