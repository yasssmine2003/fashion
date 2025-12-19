import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  // Images Instagram pour la grid
  private instagramImages = [
    '1515886657613-9f3515b0c78f',
    '1483985988355-763728e1935b',
    '1490481651871-ab68de25d43d',
    '1445205170230-053b83016050',
    '1539008835657-9e8e9680c956',
    '1564859228273-274232fdb516',
    '1521572163474-6864f9cf17ab'
  ];

  ngOnInit(): void {
    // Scroll to top au chargement de la page
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    // Initialiser AOS après le chargement de la vue
    setTimeout(() => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out'
      });
    }, 100);
  }

  /**
   * Obtenir l'ID d'image Instagram pour la grid
   */
  getInstagramImage(index: number): string {
    return this.instagramImages[index - 1] || this.instagramImages[0];
  }
}