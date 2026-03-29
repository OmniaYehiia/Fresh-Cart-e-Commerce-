import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { ICategory } from '../../core/models/ICategory/icategory.interface';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { CategoryService } from '../../core/services/category/category.service';
import { register } from 'swiper/element/bundle';
import { ProductsService } from '../../core/services/products/products.service';
import { CtaegoryCardComponent } from '../../shared/components/ctaegory-card/ctaegory-card.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwish } from '../../core/models/Iwish/iwish.interface';

@Component({
  selector: 'app-home',
  imports: [CtaegoryCardComponent, ProductCardComponent, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  categoryList: WritableSignal<ICategory[]> = signal([]);
  productList: WritableSignal<IProduct[]> = signal([]);
  wishListItems: WritableSignal<Iwish[]> = signal([]);
  private readonly categoryService = inject(CategoryService);
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    this.getLoggedUserWishlist();
    register();
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

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);
        console.log(this.productList());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getLoggedUserWishlist() {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res) => {
        // console.log('wishlist', res);
        this.wishListItems.set(res.data);
        console.log('wishlist', this.wishListItems());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
