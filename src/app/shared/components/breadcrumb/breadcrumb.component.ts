import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav class="flex items-center space-x-2 text-sm text-neutral-600 py-4">
      <a routerLink="/" class="hover:text-primary-coral transition-colors duration-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      </a>
      
      <ng-container *ngFor="let item of items; let last = last">
        <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
        
        <a *ngIf="item.url && !last" 
           [routerLink]="item.url" 
           class="hover:text-primary-coral transition-colors duration-300">
          {{ item.label }}
        </a>
        
        <span *ngIf="!item.url || last" class="font-medium text-neutral-900">
          {{ item.label }}
        </span>
      </ng-container>
    </nav>
  `
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}