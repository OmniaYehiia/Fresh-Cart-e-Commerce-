import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Ibrand } from '../../core/models/Ibrand/ibrand.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private readonly productsService = inject(ProductsService);
  brandsList: WritableSignal<Ibrand[]> = signal([]);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.productsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
