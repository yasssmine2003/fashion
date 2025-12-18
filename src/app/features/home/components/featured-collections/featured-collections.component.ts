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
      image: 'https://images.unsplash.com/photo-1760172551779-5bd7f920a54b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/products?collection=summer',
      bgColor: '#FFB6C1',
      textColor: '#FFFFFF'
    },
    {
      id: 3,
      title: 'Cozy Winter',
      description: 'Stay warm and stylish with our winter essentials',
      image: 'https://images.unsplash.com/photo-1760856269352-d0d5ca6ad3c7?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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