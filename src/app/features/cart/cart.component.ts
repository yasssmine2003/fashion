import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '@core/models/cart.model';
import { CartService } from './services/cart.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  cart$!: Observable<Cart>;
  cart!: Cart;
  
  // Code promo
  promoCode = '';
  promoCodeApplied = false;

  // Seuil de livraison gratuite
  freeShippingThreshold = environment.freeShippingThreshold;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // S'abonner au panier
    this.cart$ = this.cartService.cart$;
    
    this.cart$.subscribe(cart => {
      this.cart = cart;
      this.promoCodeApplied = cart.discount > 0;
    });

    // Scroll to top
    window.scrollTo(0, 0);
  }

  /**
   * Mettre à jour la quantité d'un item
   */
  updateQuantity(itemId: string, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  /**
   * Augmenter la quantité
   */
  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.stock) {
      this.updateQuantity(item.id, item.quantity + 1);
    }
  }

  /**
   * Diminuer la quantité
   */
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateQuantity(item.id, item.quantity - 1);
    }
  }

  /**
   * Supprimer un item
   */
  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  /**
   * Vider le panier
   */
  clearCart(): void {
    if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      this.cartService.clearCart();
    }
  }

  /**
   * Appliquer le code promo
   */
  applyPromoCode(): void {
    if (!this.promoCode.trim()) return;

    const success = this.cartService.applyPromoCode(this.promoCode);
    
    if (success) {
      this.promoCodeApplied = true;
    }
  }

  /**
   * Supprimer le code promo
   */
  removePromoCode(): void {
    this.cartService.removePromoCode();
    this.promoCode = '';
    this.promoCodeApplied = false;
  }

  /**
   * Calculer le pourcentage de progression vers la livraison gratuite
   */
  getFreeShippingProgress(): number {
    return Math.min((this.cart.subtotal / this.freeShippingThreshold) * 100, 100);
  }

  /**
   * Montant restant pour la livraison gratuite
   */
  getRemainingForFreeShipping(): number {
    return Math.max(0, this.freeShippingThreshold - this.cart.subtotal);
  }

  /**
   * Vérifier si livraison gratuite atteinte
   */
  isFreeShippingEligible(): boolean {
    return this.cart.subtotal >= this.freeShippingThreshold;
  }

  /**
   * Continuer les achats
   */
  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  /**
   * Passer à la commande
   */
  proceedToCheckout(): void {
    if (this.cart.items.length === 0) return;
    this.router.navigate(['/checkout']);
  }

  /**
   * Voir le produit
   */
  viewProduct(item: CartItem): void {
    // Navigation vers la page produit (à implémenter)
    this.router.navigate(['/products', item.productId]);
  }
}