/**
 * Interface pour un item du panier
 */
export interface CartItem {
    id: string; // ID unique (productId-size-color)
    productId: number;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
    stock: number;
  }
  
  /**
   * Interface pour le panier complet
   */
  export interface Cart {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    itemCount: number;
  }
  
  /**
   * Request pour ajouter un item au panier
   */
  export interface AddToCartRequest {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
    stock: number;
  }
  
  /**
   * Request pour mettre à jour un item du panier
   */
  export interface UpdateCartItemRequest {
    id: string;
    quantity: number;
  }
  
  /**
   * Interface pour un code promo
   */
  export interface PromoCode {
    code: string;
    discount: number; // Pourcentage (0.30 pour 30%) ou montant fixe
    type: 'percentage' | 'fixed';
    expiresAt: string;
    minAmount?: number; // Montant minimum pour utiliser le code
    maxDiscount?: number; // Réduction maximum (pour les pourcentages)
    description?: string;
  }
  
  /**
   * État du panier pour l'UI
   */
  export interface CartState {
    loading: boolean;
    error: string | null;
    cart: Cart;
  }
  
  /**
   * Statistiques du panier
   */
  export interface CartSummary {
    totalItems: number;
    totalQuantity: number;
    subtotal: number;
    savings: number; // Économies réalisées (réductions)
    finalTotal: number;
    hasDiscount: boolean;
    isFreeShipping: boolean;
    remainingForFreeShipping: number;
  }