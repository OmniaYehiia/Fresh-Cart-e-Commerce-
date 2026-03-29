import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwish } from '../../core/models/Iwish/iwish.interface';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  productId: WritableSignal<string | null> = signal('');
  prodData: WritableSignal<IProduct> = signal({} as IProduct);
  wishListItems: WritableSignal<Iwish[]> = signal([]);

  inWishlist: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.inWishlist.set(JSON.parse(localStorage.getItem('inwishlist') || 'false'));
    this.getProductIdFromRoute();
  }

  getProductIdFromRoute() {
    this.activatedRoute.paramMap.subscribe((url) => {
      if (url.get('id')) {
        this.productId.set(url.get('id'));
        this.getSpecificProduct();
      }
    });
  }

  getSpecificProduct() {
    this.productsService.getSpecificProduct(this.productId()).subscribe({
      next: (res) => {
        console.log(res);
        this.prodData.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCart(id: any) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.numberOfCartItems.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToWishlist(productId: any) {
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.inWishlist.set(true);
        localStorage.setItem('inwishlist', JSON.stringify(this.inWishlist()));
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  removeProductFromWishlist(id: any) {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        const ids = new Set(res.data);
        this.wishListItems.update((items) => items.filter((item) => ids.has(item.id)));
        console.log(this.wishListItems());
        this.inWishlist.set(false);
        localStorage.setItem('inwishlist', JSON.stringify(this.inWishlist()));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateQuantity(id: any, newCount: any) {
    this.cartService.updateItemQuantity(id, newCount).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
