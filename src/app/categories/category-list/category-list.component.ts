// src/app/categories/category-list/category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Category } from '@core/models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  error = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getAllCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.error = true;
          this.loading = false;
        }
      });
  }

  getFeaturedCategories(): Category[] {
    return this.categories.filter(category => category.featured);
  }

  getRegularCategories(): Category[] {
    return this.categories.filter(category => !category.featured);
  }
}