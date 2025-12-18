// src/app/products/product-detail/product-detail.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Product } from '@core/models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;
  error = false;
  
  // Image gallery
  selectedImageIndex = 0;
  
  // Product details
  selectedSize: string | null = null;
  selectedColor: string | null = null;
  quantity = 1;
  
  // Accordion state
  accordionState = {
    description: true,
    specifications: false,
    shipping: false,
    reviews: false
  };

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProduct(): void {
    this.loading = true;
    this.error = false;

    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const slug = params['slug'];
        return this.productService.getProductBySlug(slug);
      })
    ).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.loadRelatedProducts(product.id);
          this.loading = false;
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  private loadRelatedProducts(productId: number): void {
    this.productService.getRelatedProducts(productId, 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.relatedProducts = products;
      });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  toggleAccordion(section: keyof typeof this.accordionState): void {
    this.accordionState[section] = !this.accordionState[section];
  }

  addToCart(): void {
    if (!this.product || !this.selectedSize || !this.selectedColor) {
      // Afficher un message d'erreur
      return;
    }

    const cartItem = {
      product: this.product,
      size: this.selectedSize,
      color: this.selectedColor,
      quantity: this.quantity
    };

    console.log('Added to cart:', cartItem);
    // TODO: Implémenter CartService
  }

  addToWishlist(): void {
    if (this.product) {
      console.log('Added to wishlist:', this.product);
      // TODO: Implémenter WishlistService
    }
  }

  get discountPercentage(): number {
    if (this.product?.originalPrice && this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return 0;
  }

  get isOnSale(): boolean {
    return !!this.product?.originalPrice && this.product.price < this.product.originalPrice;
  }

  get isOutOfStock(): boolean {
    return this.product?.stock === 0;
  }
}