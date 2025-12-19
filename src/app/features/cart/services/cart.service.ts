import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Cart } from '@core/models/cart.model';
import { StorageService } from '@core/services/storage.service';
import { NotificationService } from '@core/services/notification.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'fashion_cart';

  // State management avec BehaviorSubject
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;

  constructor(
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {
    // Initialiser le panier depuis le localStorage
    const savedCart = this.loadCartFromStorage();
    this.cartSubject = new BehaviorSubject<Cart>(savedCart);
    this.cart$ = this.cartSubject.asObservable();
  }

  /**
   * Obtenir le panier actuel
   */
  get currentCart(): Cart {
    return this.cartSubject.value;
  }

  /**
   * Obtenir le nombre d'items dans le panier
   */
  get itemCount(): number {
    return this.currentCart.itemCount;
  }

  /**
   * Ajouter un produit au panier
   */
  addToCart(item: Omit<CartItem, 'id'>): void {
    const cart = this.currentCart;
    
    // Générer un ID unique pour l'item (productId-size-color)
    const itemId = `${item.productId}-${item.size}-${item.color}`;
    
    // Vérifier si l'item existe déjà
    const existingItemIndex = cart.items.findIndex(i => i.id === itemId);

    if (existingItemIndex > -1) {
      // Item existe déjà, augmenter la quantité
      const existingItem = cart.items[existingItemIndex];
      const newQuantity = existingItem.quantity + item.quantity;

      // Vérifier le stock
      if (newQuantity > item.stock) {
        this.notificationService.warning(
          `Stock insuffisant. Maximum disponible: ${item.stock}`,
          'Stock limité'
        );
        return;
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Nouvel item
      const newItem: CartItem = {
        id: itemId,
        ...item
      };
      cart.items.push(newItem);
    }

    // Recalculer les totaux
    this.recalculateCart(cart);

    // Sauvegarder et notifier
    this.saveCart(cart);
    this.notificationService.addedToCart(item.name);
  }

  /**
   * Mettre à jour la quantité d'un item
   */
  updateQuantity(itemId: string, quantity: number): void {
    const cart = this.currentCart;
    const itemIndex = cart.items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) return;

    const item = cart.items[itemIndex];

    // Vérifier le stock
    if (quantity > item.stock) {
      this.notificationService.warning(
        `Stock insuffisant. Maximum disponible: ${item.stock}`,
        'Stock limité'
      );
      return;
    }

    // Vérifier quantité minimale
    if (quantity < 1) {
      this.removeFromCart(itemId);
      return;
    }

    // Mettre à jour la quantité
    cart.items[itemIndex].quantity = quantity;

    // Recalculer et sauvegarder
    this.recalculateCart(cart);
    this.saveCart(cart);
  }

  /**
   * Supprimer un item du panier
   */
  removeFromCart(itemId: string): void {
    const cart = this.currentCart;
    const item = cart.items.find(i => i.id === itemId);

    if (!item) return;

    // Filtrer l'item
    cart.items = cart.items.filter(i => i.id !== itemId);

    // Recalculer et sauvegarder
    this.recalculateCart(cart);
    this.saveCart(cart);

    this.notificationService.removedFromCart(item.name);
  }

  /**
   * Vider le panier
   */
  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
      itemCount: 0
    };

    this.saveCart(emptyCart);
    this.notificationService.info('Panier vidé', 'Panier');
  }

  /**
   * Appliquer un code promo
   */
  applyPromoCode(code: string): boolean {
    const cart = this.currentCart;

    // Codes promo disponibles (simulation)
    const promoCodes: { [key: string]: number } = {
      'WINTER30': 0.30,
      'FASHION20': 0.20,
      'WELCOME10': 0.10,
      'VIP50': 0.50
    };

    const discountPercentage = promoCodes[code.toUpperCase()];

    if (!discountPercentage) {
      this.notificationService.error('Code promo invalide', 'Erreur');
      return false;
    }

    // Calculer la réduction
    cart.discount = cart.subtotal * discountPercentage;

    // Recalculer le total
    this.recalculateCart(cart);
    this.saveCart(cart);

    this.notificationService.success(
      `Réduction de ${discountPercentage * 100}% appliquée !`,
      'Code promo activé'
    );

    return true;
  }

  /**
   * Supprimer le code promo
   */
  removePromoCode(): void {
    const cart = this.currentCart;
    cart.discount = 0;

    this.recalculateCart(cart);
    this.saveCart(cart);

    this.notificationService.info('Code promo retiré', 'Panier');
  }

  /**
   * Recalculer tous les totaux du panier
   */
  private recalculateCart(cart: Cart): void {
    // Calculer le sous-total
    cart.subtotal = cart.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    // Calculer le nombre d'items
    cart.itemCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Calculer les frais de livraison
    cart.shipping = cart.subtotal >= environment.freeShippingThreshold 
      ? 0 
      : environment.shippingCost;

    // Calculer la taxe (après réduction)
    const subtotalAfterDiscount = cart.subtotal - cart.discount;
    cart.tax = subtotalAfterDiscount * environment.taxRate;

    // Calculer le total
    cart.total = subtotalAfterDiscount + cart.shipping + cart.tax;

    // S'assurer que le total n'est pas négatif
    cart.total = Math.max(0, cart.total);
  }

  /**
   * Sauvegarder le panier
   */
  private saveCart(cart: Cart): void {
    this.storageService.set(this.CART_STORAGE_KEY, cart);
    this.cartSubject.next(cart);
  }

  /**
   * Charger le panier depuis le localStorage
   */
  private loadCartFromStorage(): Cart {
    const savedCart = this.storageService.get<Cart>(this.CART_STORAGE_KEY);

    if (savedCart && savedCart.items && Array.isArray(savedCart.items)) {
      // Recalculer les totaux au cas où les prix auraient changé
      this.recalculateCart(savedCart);
      return savedCart;
    }

    // Panier vide par défaut
    return {
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
      itemCount: 0
    };
  }
}