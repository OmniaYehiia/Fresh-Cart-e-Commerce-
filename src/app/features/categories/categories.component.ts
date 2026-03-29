import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../core/services/category/category.service';
import { ICategory } from '../../core/models/ICategory/icategory.interface';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly categoryService = inject(CategoryService);
  categoryList: WritableSignal<ICategory[]> = signal([]);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
        console.log('all categories', this.categoryList());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
