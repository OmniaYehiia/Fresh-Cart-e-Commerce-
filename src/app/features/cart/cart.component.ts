import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../core/models/ICart/icart.interface';
import { ICategory } from '../../core/models/ICategory/icategory.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails: WritableSignal<Icart> = signal({} as Icart);
  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItemFromCart(id: any) {
    this.cartService.removeItemFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res);
        this.cartService.numberOfCartItems.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetCartItems() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartDetails.set({} as Icart);
          this.cartService.numberOfCartItems.set(0);
        }
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
        this.cartDetails.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
