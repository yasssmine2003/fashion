import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Product } from '@core/models/product.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss']
})
export class TrendingProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTrendingProducts();
  }

  /**
   * Charger les produits tendances
   */
  loadTrendingProducts(): void {
    this.http.get<Product[]>(`${environment.apiUrl}/products?trending=true&_limit=8`)
      .subscribe({
        next: (products) => {
          this.products = products;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur chargement produits:', error);
          this.loading = false;
        }
      });
  }

  /**
   * Ajouter au panier
   */
  addToCart(product: Product): void {
    console.log('Ajout au panier:', product);
    this.notificationService.addedToCart(product.name);
    // TODO: Implémenter CartService
  }

  /**
   * Ajouter aux favoris
   */
  addToWishlist(product: Product): void {
    console.log('Ajout aux favoris:', product);
    this.notificationService.addedToWishlist(product.name);
    // TODO: Implémenter WishlistService
  }
}