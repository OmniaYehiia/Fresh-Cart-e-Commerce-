import { Component, inject, NgModule, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { Iwish } from '../../core/models/Iwish/iwish.interface';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [RouterLink, ProductCardComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productList: WritableSignal<IProduct[]> = signal([]);
  wishListItems: WritableSignal<Iwish[]> = signal([]);
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);

  pageSize: WritableSignal<number> = signal(0);
  p: WritableSignal<number> = signal(0);
  total: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.getAllProducts();
    this.getLoggedUserWishlist();
  }

  getAllProducts(pageNumber: number = 1) {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        console.log(this.productList());
        this.pageSize.set(res.metadata.limit);
        this.p.set(res.metadata.currentPage);
        this.total.set(res.results);
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

  pageChanged(e: number) {
    this.p.set(e);
    this.getAllProducts(e);
  }
}
