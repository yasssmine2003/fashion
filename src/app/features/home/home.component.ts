import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    // Initialiser AOS (Animate On Scroll)
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }
}