// src/app/products/product-grid/product-grid.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Input() viewMode: 'grid' | 'list' = 'grid';

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  getDiscountPercentage(product: Product): number {
    if (product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  }

  isOnSale(product: Product): boolean {
    return !!product.originalPrice && product.price < product.originalPrice;
  }
}