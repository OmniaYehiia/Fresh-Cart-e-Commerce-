import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly id = inject(PLATFORM_ID);

  mobileMenuOpen: WritableSignal<boolean> = signal(false);
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  cartItems: Signal<number> = computed(() => this.cartService.numberOfCartItems());

  toggleMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen);
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getLoggedUserCart();
    this.checkUser();
  }

  getLoggedUserCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.numberOfCartItems.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    this.spinner.show();
    setTimeout(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      this.spinner.hide();
      this.authService.isLoggedIn.set(false);
    }, 1000);
  }

  checkUser() {
    if (isPlatformBrowser(this.id)) {
      if (localStorage.getItem('token') != undefined) {
        this.authService.isLoggedIn.set(true);
      } else {
        this.authService.isLoggedIn.set(false);
      }
    }
  }
}
