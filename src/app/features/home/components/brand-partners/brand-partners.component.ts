import { Component } from '@angular/core';

interface Brand {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-brand-partners',
  template: `
    <section class="py-12 bg-primary-yellow/30" data-aos="fade-up">
      <div class="container-custom">
        <h3 class="text-center text-neutral-600 text-sm uppercase tracking-wider mb-8 font-semibold">
          Nos Marques Partenaires
        </h3>
        
        <div class="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          <div 
            *ngFor="let brand of brands"
            class="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
            <img 
              [src]="brand.logo" 
              [alt]="brand.name"
              class="h-8 md:h-10 object-contain">
          </div>
        </div>
      </div>
    </section>
  `
})
export class BrandPartnersComponent {
  brands: Brand[] = [
    { name: 'H&M', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/200px-H%26M-Logo.svg.png' },
    { name: 'OBEY', logo: 'https://1000logos.net/wp-content/uploads/2021/04/Obey-logo.png' },
    { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/200px-Shopify_logo_2018.svg.png' },
    { name: 'Lacoste', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lacoste_logo.svg/200px-Lacoste_logo.svg.png' },
    { name: "Levi's", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Levis_logo.svg/200px-Levis_logo.svg.png' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' }
  ];
}