import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { Observable } from 'rxjs';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$!: Observable<User | null>;
  isAuthenticated$!: Observable<boolean>;
  
  // État du menu mobile
  isMobileMenuOpen = false;
  
  // État du menu utilisateur
  isUserMenuOpen = false;
  
  // Scroll state
  isScrolled = false;
  
  // Nombre d'items dans le panier (mis à jour en temps réel)
  cartItemCount = 0;

  // Catégories statiques (en attendant le service)
  mainCategories = [
    { slug: 'robes', name: 'Robes', icon: '👗', count: 24 },
    { slug: 'hauts', name: 'Hauts', icon: '👚', count: 42 },
    { slug: 'pantalons', name: 'Pantalons', icon: '👖', count: 36 },
    { slug: 'jupes', name: 'Jupes', icon: '👘', count: 18 },
    { slug: 'vestes', name: 'Vestes', icon: '🧥', count: 15 },
    { slug: 'manteaux', name: 'Manteaux', icon: '🧣', count: 12 }
  ];

  constructor(
    private authService: AuthService,
    private cartService: CartService, // ✅ AJOUT DU CART SERVICE
    private router: Router
  ) {}

  ngOnInit(): void {
    // S'abonner à l'état d'authentification
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;

    // ✅ S'abonner au panier pour mettre à jour le compteur en temps réel
    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.itemCount;
    });
  }

  /**
   * Détecter le scroll pour changer le style du header
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  /**
   * Fermer les menus quand on clique en dehors
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isInsideMenu = target.closest('.user-menu-container') || 
                         target.closest('.mobile-menu-toggle');
    
    if (!isInsideMenu && (this.isUserMenuOpen || this.isMobileMenuOpen)) {
      this.closeAllMenus();
    }
  }

  /**
   * Toggle menu mobile
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Fermer le menu utilisateur si ouvert
    if (this.isMobileMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  /**
   * Toggle menu utilisateur
   */
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    // Fermer le menu mobile si ouvert
    if (this.isUserMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  /**
   * Fermer tous les menus
   */
  closeAllMenus(): void {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  /**
   * Alias pour compatibilité
   */
  closeMenus(): void {
    this.closeAllMenus();
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.authService.logout();
    this.closeAllMenus();
    // Pas besoin de router.navigate car AuthService le fait déjà
  }

  /**
   * Naviguer vers le profil
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeAllMenus();
  }

  /**
   * Naviguer vers le dashboard admin
   */
  goToAdmin(): void {
    this.router.navigate(['/admin']);
    this.closeAllMenus();
  }

  /**
   * Naviguer vers une catégorie
   */
  goToCategory(categorySlug: string): void {
    this.router.navigate(['/products'], { queryParams: { category: categorySlug } });
    this.closeAllMenus();
  }

  /**
   * Naviguer vers toutes les catégories
   */
  goToCategories(): void {
    this.router.navigate(['/categories']);
    this.closeAllMenus();
  }

  /**
   * Vérifier si l'utilisateur est admin
   */
  isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  /**
   * Obtenir la liste des catégories principales
   */
  getMainCategories(): any[] {
    return this.mainCategories;
  }

  /**
   * Obtenir l'icône d'une catégorie
   */
  getCategoryIcon(categorySlug: string): string {
    const category = this.mainCategories.find(c => c.slug === categorySlug);
    return category ? category.icon : '🛍️';
  }
}