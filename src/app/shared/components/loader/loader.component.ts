import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loading$ | async" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div class="flex flex-col items-center space-y-4">
        <!-- Spinner -->
        <div class="relative">
          <div class="w-16 h-16 border-4 border-primary-pink/30 border-t-primary-pink rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-pink to-primary-coral rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <!-- Text -->
        <p class="text-neutral-700 font-medium animate-pulse">Chargement...</p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `]
})
export class LoaderComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }
}