import { Component, inject, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwish } from '../../core/models/Iwish/iwish.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);

  wishListItems: WritableSignal<Iwish[]> = signal([]);
  ngOnInit(): void {
    this.getwishlistItems();
  }

  addProductToCart(id: any) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.numberOfCartItems.set(res.numOfCartItems + 1);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getwishlistItems() {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res) => {
        this.wishListItems.set(res.data);
        console.log(this.wishListItems());
        console.log(this.wishListItems().length);
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
