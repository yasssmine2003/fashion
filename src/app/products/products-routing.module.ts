// src/app/products/products-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'Boutique - Nos Produits' }
  },
  {
    path: 'search',
    component: ProductListComponent,
    data: { title: 'Recherche' }
  },
  {
    path: 'category/:category',
    component: ProductListComponent,
    data: { title: 'Catégorie' }
  },
  {
    path: 'new',
    component: ProductListComponent,
    data: { title: 'Nouveautés' }
  },
  {
    path: 'sale',
    component: ProductListComponent,
    data: { title: 'Promotions' }
  },
  {
    path: ':slug',
    component: ProductDetailComponent,
    data: { title: 'Détails Produit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }