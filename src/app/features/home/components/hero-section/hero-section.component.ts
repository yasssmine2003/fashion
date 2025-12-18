import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  currentSlide = 0;
  
  slides: HeroSlide[] = [
    {
      id: 1,
      title: "LET'S EXPLORE",
      subtitle: "UNIQUE CLOTHES.",
      description: "Live for Influential and Innovative fashion!",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      buttonText: "SHOP NOW",
      buttonLink: "/products",
      bgColor: "#F9E794"
    },
    {
      id: 2,
      title: "NEW COLLECTION",
      subtitle: "WINTER 2024",
      description: "Discover our cozy and trendy winter collection",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      buttonText: "DISCOVER",
      buttonLink: "/products?category=winter",
      bgColor: "#FFB6C1"
    },
    {
      id: 3,
      title: "UP TO 50% OFF",
      subtitle: "SALE SEASON",
      description: "Limited time offers on selected items",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
      buttonText: "SHOP SALE",
      buttonLink: "/products?sale=true",
      bgColor: "#C8B6FF"
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Auto-slide toutes les 5 secondes
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  /**
   * Aller au slide suivant
   */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  /**
   * Aller au slide précédent
   */
  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 
      ? this.slides.length - 1 
      : this.currentSlide - 1;
  }

  /**
   * Aller à un slide spécifique
   */
  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  /**
   * Naviguer vers la page produits
   */
  shopNow(): void {
    const currentSlideData = this.slides[this.currentSlide];
    this.router.navigateByUrl(currentSlideData.buttonLink);
  }
}