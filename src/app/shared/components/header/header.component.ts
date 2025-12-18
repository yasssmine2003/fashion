import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@core/models/user.model';
import { Observable } from 'rxjs';

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
  
  // Nombre d'items dans le panier (sera implémenté avec CartService)
  cartItemCount = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // S'abonner à l'état d'authentification
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  /**
   * Détecter le scroll pour changer le style du header
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  /**
   * Toggle menu mobile
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Toggle menu utilisateur
   */
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  /**
   * Fermer les menus
   */
  closeMenus(): void {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  /**
   * Navigation vers la page de recherche
   */
  onSearch(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: query } });
      this.closeMenus();
    }
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.authService.logout();
    this.closeMenus();
  }

  /**
   * Naviguer vers le profil
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenus();
  }

  /**
   * Naviguer vers le dashboard admin
   */
  goToAdmin(): void {
    this.router.navigate(['/admin']);
    this.closeMenus();
  }

  /**
   * Vérifier si l'utilisateur est admin
   */
  isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}