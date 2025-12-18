import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

// Shared Module
import { SharedModule } from '@shared/shared.module';

// Components
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { PromoBannerComponent } from './components/promo-banner/promo-banner.component';
import { BrandPartnersComponent } from './components/brand-partners/brand-partners.component';
import { FeaturedCollectionsComponent } from './components/featured-collections/featured-collections.component';
import { TrendingProductsComponent } from './components/trending-products/trending-products.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    BrandPartnersComponent,
    FeaturedCollectionsComponent,
    TrendingProductsComponent,
    PromoBannerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule {}
