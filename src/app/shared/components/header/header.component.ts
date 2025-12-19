// Version simplifiée sans CategoryService
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
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
  
  // Nombre d'items dans le panier
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeAllMenus(): void {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  closeMenus(): void {
    this.closeAllMenus();
  }

  logout(): void {
    this.authService.logout();
    this.closeAllMenus();
    this.router.navigate(['/']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeAllMenus();
  }

  goToAdmin(): void {
    this.router.navigate(['/admin']);
    this.closeAllMenus();
  }

  goToCategory(categorySlug: string): void {
    this.router.navigate(['/products'], { queryParams: { category: categorySlug } });
    this.closeAllMenus();
  }

  goToCategories(): void {
    this.router.navigate(['/categories']);
    this.closeAllMenus();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  getMainCategories(): any[] {
    return this.mainCategories;
  }

  getCategoryIcon(categorySlug: string): string {
    const category = this.mainCategories.find(c => c.slug === categorySlug);
    return category ? category.icon : '🛍️';
  }
}