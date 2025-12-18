import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  /**
   * Notification de succès
   */
  success(message: string, title: string = 'Succès'): void {
    this.toastr.success(message, title, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

  /**
   * Notification d'erreur
   */
  error(message: string, title: string = 'Erreur'): void {
    this.toastr.error(message, title, {
      timeOut: 4000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

  /**
   * Notification d'information
   */
  info(message: string, title: string = 'Information'): void {
    this.toastr.info(message, title, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

  /**
   * Notification d'avertissement
   */
  warning(message: string, title: string = 'Attention'): void {
    this.toastr.warning(message, title, {
      timeOut: 3500,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

  /**
   * Notification pour l'ajout au panier
   */
  addedToCart(productName: string): void {
    this.success(`${productName} a été ajouté au panier`, '🛒 Panier');
  }

  /**
   * Notification pour la suppression du panier
   */
  removedFromCart(productName: string): void {
    this.info(`${productName} a été retiré du panier`, '🛒 Panier');
  }

  /**
   * Notification pour l'ajout à la wishlist
   */
  addedToWishlist(productName: string): void {
    this.success(`${productName} a été ajouté à vos favoris`, '❤️ Favoris');
  }

  /**
   * Notification pour la commande
   */
  orderPlaced(orderNumber: string): void {
    this.success(`Votre commande ${orderNumber} a été passée avec succès`, '✅ Commande confirmée');
  }

  /**
   * Notification de connexion
   */
  loginSuccess(userName: string): void {
    this.success(`Bienvenue ${userName} !`, '👋 Connexion réussie');
  }

  /**
   * Notification de déconnexion
   */
  logoutSuccess(): void {
    this.info('Vous êtes déconnecté', '👋 À bientôt');
  }

  /**
   * Notification d'inscription
   */
  registerSuccess(): void {
    this.success('Votre compte a été créé avec succès', '🎉 Bienvenue');
  }
}