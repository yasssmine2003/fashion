import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() addToWishlist = new EventEmitter<Product>();

  isHovered = false;

  constructor(private router: Router) {}

  /**
   * Naviguer vers la page produit
   */
  viewProduct(): void {
    this.router.navigate(['/products', this.product.slug]);
  }

  /**
   * Ajouter au panier
   */
  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  /**
   * Ajouter aux favoris
   */
  onAddToWishlist(event: Event): void {
    event.stopPropagation();
    this.addToWishlist.emit(this.product);
  }

  /**
   * Calculer le pourcentage de réduction
   */
  get discountPercentage(): number {
    if (this.product.originalPrice && this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return 0;
  }

  /**
   * Vérifier si le produit est en promotion
   */
  get isOnSale(): boolean {
    return this.product.originalPrice ? this.product.price < this.product.originalPrice : false;
  }
}