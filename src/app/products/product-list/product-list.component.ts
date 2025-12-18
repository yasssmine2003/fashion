// src/app/products/product-list/product-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product, ProductFilter } from '@core/models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  error = false;
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;
  
  // Filtres
  filter: ProductFilter = {};
  searchQuery = '';
  
  // Options de tri
  sortOptions = [
    { value: 'newest', label: 'Nouveautés' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Meilleures notes' },
    { value: 'name', label: 'Nom A-Z' }
  ];
  
  // Options de vue
  viewMode: 'grid' | 'list' = 'grid';
  
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupSearch();
    this.loadProducts();
    
    // Écouter les changements de route pour les filtres
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.parseQueryParams(params);
        this.loadProducts();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.onSearch(query);
    });
  }

   loadProducts(): void {
    this.loading = true;
    this.error = false;

    this.productService.getProducts(this.filter, this.currentPage, this.itemsPerPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.filteredProducts = [...this.products];
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.error = true;
          this.loading = false;
        }
      });
  }

  private parseQueryParams(params: any): void {
    // Parse les paramètres de l'URL en filtres
    if (params.category) {
      this.filter.categories = Array.isArray(params.category) 
        ? params.category 
        : [params.category];
    }
    
    if (params.search) {
      this.searchQuery = params.search;
    }
    
    if (params.sort) {
      this.filter.sortBy = params.sort as any;
    }
    
    if (params.minPrice || params.maxPrice) {
      this.filter.priceRange = {
        min: params.minPrice ? +params.minPrice : 0,
        max: params.maxPrice ? +params.maxPrice : 1000
      };
    }
  }

  onSearchInput(query: string): void {
    this.searchSubject.next(query);
  }

  onSearch(query: string): void {
    if (query.trim()) {
      this.productService.searchProducts(query)
        .pipe(takeUntil(this.destroy$))
        .subscribe(products => {
          this.filteredProducts = products;
        });
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  onFilterChange(filter: ProductFilter): void {
    this.filter = { ...this.filter, ...filter };
    this.currentPage = 1; // Retour à la première page
    this.updateUrl();
  }

  onSortChange(sortBy: string): void {
    this.filter.sortBy = sortBy as any;
    this.updateUrl();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
    window.scrollTo(0, 0);
  }

  onViewModeChange(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  private updateUrl(): void {
    const queryParams: any = {};
    
    if (this.filter.categories) {
      queryParams.category = this.filter.categories;
    }
    
    if (this.filter.sortBy) {
      queryParams.sort = this.filter.sortBy;
    }
    
    if (this.filter.priceRange) {
      queryParams.minPrice = this.filter.priceRange.min;
      queryParams.maxPrice = this.filter.priceRange.max;
    }
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}