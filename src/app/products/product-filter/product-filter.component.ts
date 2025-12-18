// src/app/products/product-filter/product-filter.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductFilter } from '@core/models/product.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  @Input() filter: ProductFilter = {};
  @Output() filterChange = new EventEmitter<ProductFilter>();

  // Options de filtrage
  categories = [
    { value: 'robes', label: 'Robes', count: 24 },
    { value: 'hauts', label: 'Hauts', count: 42 },
    { value: 'pantalons', label: 'Pantalons', count: 36 },
    { value: 'jupes', label: 'Jupes', count: 18 },
    { value: 'vestes', label: 'Vestes', count: 15 },
    { value: 'manteaux', label: 'Manteaux', count: 12 }
  ];

  sizes = [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' }
  ];

  colors = [
    { value: 'noir', label: 'Noir', color: '#000000' },
    { value: 'blanc', label: 'Blanc', color: '#FFFFFF' },
    { value: 'bleu', label: 'Bleu', color: '#3B82F6' },
    { value: 'rose', label: 'Rose', color: '#EC4899' },
    { value: 'vert', label: 'Vert', color: '#10B981' },
    { value: 'beige', label: 'Beige', color: '#F5F5DC' },
    { value: 'rouge', label: 'Rouge', color: '#EF4444' },
    { value: 'gris', label: 'Gris', color: '#9CA3AF' }
  ];

  brands = [
    { value: 'Fashion Élégance', label: 'Fashion Élégance' },
    { value: 'Urban Chic', label: 'Urban Chic' },
    { value: 'Denim Rebel', label: 'Denim Rebel' },
    { value: 'Comfy Wear', label: 'Comfy Wear' },
    { value: 'Feminine Style', label: 'Feminine Style' },
    { value: 'Classic Coat', label: 'Classic Coat' }
  ];

  ratings = [
    { value: 5, label: '5 étoiles et plus' },
    { value: 4, label: '4 étoiles et plus' },
    { value: 3, label: '3 étoiles et plus' },
    { value: 2, label: '2 étoiles et plus' },
    { value: 1, label: '1 étoile et plus' }
  ];

  // État des filtres
  priceRange = { min: 0, max: 500 };
  selectedCategories: string[] = [];
  selectedSizes: string[] = [];
  selectedColors: string[] = [];
  selectedBrands: string[] = [];
  selectedRatings: number[] = [];
  
  // Filtres booléens
  inStockOnly = false;
  onSaleOnly = false;
  newArrivalsOnly = false;
  trendingOnly = false;

  ngOnInit(): void {
    this.initializeFilters();
  }

  private initializeFilters(): void {
    if (this.filter.categories) {
      this.selectedCategories = [...this.filter.categories];
    }
    if (this.filter.sizes) {
      this.selectedSizes = [...this.filter.sizes];
    }
    if (this.filter.colors) {
      this.selectedColors = [...this.filter.colors];
    }
    if (this.filter.brands) {
      this.selectedBrands = [...this.filter.brands];
    }
    if (this.filter.ratings) {
      this.selectedRatings = [...this.filter.ratings];
    }
    if (this.filter.priceRange) {
      this.priceRange = { ...this.filter.priceRange };
    }
    if (this.filter.inStock !== undefined) {
      this.inStockOnly = this.filter.inStock;
    }
    if (this.filter.onSale !== undefined) {
      this.onSaleOnly = this.filter.onSale;
    }
    if (this.filter.newArrivals !== undefined) {
      this.newArrivalsOnly = this.filter.newArrivals;
    }
    if (this.filter.trending !== undefined) {
      this.trendingOnly = this.filter.trending;
    }
  }

  onCategoryChange(category: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    
    this.applyFilters();
  }

  onSizeChange(size: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
    
    this.applyFilters();
  }

  onColorChange(color: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors = this.selectedColors.filter(c => c !== color);
    }
    
    this.applyFilters();
  }

  onBrandChange(brand: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
    
    this.applyFilters();
  }

  onRatingChange(rating: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      this.selectedRatings.push(rating);
    } else {
      this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
    }
    
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  onBooleanFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const newFilter: ProductFilter = {};

    if (this.selectedCategories.length > 0) {
      newFilter.categories = [...this.selectedCategories];
    }

    if (this.selectedSizes.length > 0) {
      newFilter.sizes = [...this.selectedSizes];
    }

    if (this.selectedColors.length > 0) {
      newFilter.colors = [...this.selectedColors];
    }

    if (this.selectedBrands.length > 0) {
      newFilter.brands = [...this.selectedBrands];
    }

    if (this.selectedRatings.length > 0) {
      newFilter.ratings = [...this.selectedRatings];
    }

    if (this.priceRange.min > 0 || this.priceRange.max < 500) {
      newFilter.priceRange = { ...this.priceRange };
    }

    if (this.inStockOnly) {
      newFilter.inStock = true;
    }

    if (this.onSaleOnly) {
      newFilter.onSale = true;
    }

    if (this.newArrivalsOnly) {
      newFilter.newArrivals = true;
    }

    if (this.trendingOnly) {
      newFilter.trending = true;
    }

    this.filterChange.emit(newFilter);
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.selectedSizes = [];
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedRatings = [];
    this.priceRange = { min: 0, max: 500 };
    this.inStockOnly = false;
    this.onSaleOnly = false;
    this.newArrivalsOnly = false;
    this.trendingOnly = false;

    this.filterChange.emit({});
  }

  get hasActiveFilters(): boolean {
    return this.selectedCategories.length > 0 ||
           this.selectedSizes.length > 0 ||
           this.selectedColors.length > 0 ||
           this.selectedBrands.length > 0 ||
           this.selectedRatings.length > 0 ||
           this.priceRange.min > 0 ||
           this.priceRange.max < 500 ||
           this.inStockOnly ||
           this.onSaleOnly ||
           this.newArrivalsOnly ||
           this.trendingOnly;
  }
}