import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { IProduct } from '../../../core/models/IProduct/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  data: InputSignal<IProduct> = input.required<IProduct>();
  wish: InputSignal<boolean> = input.required<boolean>();
  addToWish: WritableSignal<boolean> = signal(false);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

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

  addToWishlist(productId: any) {
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.addToWish.set(true);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
