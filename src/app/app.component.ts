// app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <!-- Global Loader -->
      <app-loader></app-loader>
      
      <!-- Header -->
      <app-header></app-header>
      
      <!-- Main Content -->
      <main class="min-h-screen">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    main {
      flex: 1;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'fashion-ecommerce';

  ngOnInit(): void {
    // Vous pouvez initialiser des services globaux ici
  }
}