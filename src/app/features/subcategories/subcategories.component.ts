import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../core/services/category/category.service';
import { Isubcategory } from '../../core/models/IsubCategory/isubcategory.interface';

@Component({
  selector: 'app-subcategories',
  imports: [RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
})
export class SubcategoriesComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);
  data: InputSignal<string> = input.required<string>();

  categoryId: WritableSignal<string | null> = signal('');
  subCategoryList: WritableSignal<Isubcategory[]> = signal([]);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProductIdFromRoute();
  }

  getProductIdFromRoute() {
    this.activatedRoute.paramMap.subscribe((url) => {
      if (url.get('id')) {
        this.categoryId.set(url.get('id'));
        this.getSubCategory();
      }
    });
  }

  getSubCategory() {
    this.categoryService.getSubCategories(this.categoryId()).subscribe({
      next: (res) => {
        console.log(res);
        this.subCategoryList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
