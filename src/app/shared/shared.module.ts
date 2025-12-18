import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// Pipes
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

// Directives
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ProductCardComponent,
    BreadcrumbComponent,
    
    // Pipes
    CurrencyFormatPipe,
    TruncatePipe,
    
    // Directives
    LazyLoadImageDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // Modules Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Components
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ProductCardComponent,
    BreadcrumbComponent,
    
    // Pipes
    CurrencyFormatPipe,
    TruncatePipe,
    
    // Directives
    LazyLoadImageDirective
  ]
})
export class SharedModule { }