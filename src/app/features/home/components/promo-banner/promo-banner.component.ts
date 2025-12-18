import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo-banner',
  template: `
    <section class="py-20 relative overflow-hidden" data-aos="zoom-in">
      <div 
        class="absolute inset-0 bg-gradient-to-r from-primary-pink via-primary-coral to-primary-yellow opacity-90">
      </div>
      
      <!-- Decorative circles -->
      <div class="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center text-white">
          
          <!-- Icon -->
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
            </svg>
          </div>

          <!-- Title -->
          <h2 class="text-5xl md:text-6xl font-heading font-black mb-6">
            Offre Spéciale !
          </h2>

          <!-- Subtitle -->
          <p class="text-2xl md:text-3xl font-semibold mb-4">
            -30% sur toute la collection hiver
          </p>

          <p class="text-lg mb-8 text-white/90">
            Utilisez le code <span class="font-bold bg-white/20 px-4 py-2 rounded-lg">WINTER30</span> à la caisse
          </p>

          <!-- Countdown Timer (Optional - Static for demo) -->
          <div class="flex justify-center gap-6 mb-10">
            <div class="text-center">
              <div class="text-4xl font-bold">02</div>
              <div class="text-sm uppercase">Jours</div>
            </div>
            <div class="text-4xl font-bold">:</div>
            <div class="text-center">
              <div class="text-4xl font-bold">14</div>
              <div class="text-sm uppercase">Heures</div>
            </div>
            <div class="text-4xl font-bold">:</div>
            <div class="text-center">
              <div class="text-4xl font-bold">32</div>
              <div class="text-sm uppercase">Minutes</div>
            </div>
          </div>

          <!-- CTA Button -->
          <button 
            (click)="shopNow()"
            class="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 px-12 py-4 text-lg shadow-2xl">
            Profiter maintenant
          </button>
        </div>
      </div>
    </section>
  `
})
export class PromoBannerComponent {
  constructor(private router: Router) {}

  shopNow(): void {
    this.router.navigate(['/products'], { queryParams: { sale: true } });
  }
}