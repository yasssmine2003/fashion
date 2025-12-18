import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadImageDirective implements OnInit {
  @Input() appLazyLoad!: string;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    // Observer pour détecter quand l'image entre dans le viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          observer.unobserve(this.el.nativeElement);
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    const img = this.el.nativeElement;
    
    // Ajouter une classe de chargement
    img.classList.add('loading');
    
    // Charger l'image
    img.src = this.appLazyLoad;
    
    img.onload = () => {
      img.classList.remove('loading');
      img.classList.add('loaded');
    };
    
    img.onerror = () => {
      img.classList.remove('loading');
      img.classList.add('error');
      // Image de fallback
      img.src = 'assets/images/placeholder.jpg';
    };
  }
}