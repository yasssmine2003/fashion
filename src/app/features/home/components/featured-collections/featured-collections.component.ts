import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  bgColor: string;
  textColor: string;
}

@Component({
  selector: 'app-featured-collections',
  templateUrl: './featured-collections.component.html',
  styleUrls: ['./featured-collections.component.scss']
})
export class FeaturedCollectionsComponent {
  collections: Collection[] = [
    {
      id: 1,
      title: 'Versatile',
      description: 'Mix and match pieces for endless style possibilities',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
      link: '/products?collection=versatile',
      bgColor: '#F9E794',
      textColor: '#1A1A1A'
    },
    {
      id: 2,
      title: 'Summer Vibes',
      description: 'Light and breezy outfits perfect for sunny days',
      image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=600&q=80',
      link: '/products?collection=summer',
      bgColor: '#FFB6C1',
      textColor: '#FFFFFF'
    },
    {
      id: 3,
      title: 'Cozy Winter',
      description: 'Stay warm and stylish with our winter essentials',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      link: '/products?collection=winter',
      bgColor: '#C8B6FF',
      textColor: '#FFFFFF'
    }
  ];

  constructor(private router: Router) {}

  navigateToCollection(link: string): void {
    this.router.navigateByUrl(link);
  }
}