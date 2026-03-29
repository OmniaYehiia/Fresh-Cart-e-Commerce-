import { authGuard } from './core/guards/auth/auth-guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ProductsComponent } from './features/products/products.component';
import { SupportComponent } from './features/support/support.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { AllordersComponent } from './features/allorders/allorders.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { CartComponent } from './features/cart/cart.component';
import { ForgotpasswordComponent } from './features/forgotpassword/forgotpassword.component';
import { SubcategoriesComponent } from './features/subcategories/subcategories.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, title: 'Fresh Cart' },
  { path: 'register', component: RegisterComponent, title: 'Fresh Cart' },
  { path: 'home', component: HomeComponent, title: 'Fresh Cart' },
  { path: 'products', component: ProductsComponent, title: 'Fresh Cart' },
  { path: 'product-details/:id', component: ProductDetailsComponent, title: 'Fresh Cart' },
  { path: 'brands', component: BrandsComponent, title: 'Fresh Cart' },
  { path: 'categories', component: CategoriesComponent, title: 'Fresh Cart' },
  { path: 'categories/:id', component: SubcategoriesComponent, title: 'Fresh Cart' },
  { path: 'support', component: SupportComponent, title: 'Fresh Cart' },
  { path: 'wishlist', component: WishlistComponent, title: 'Fresh Cart', canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, title: 'Fresh Cart', canActivate: [authGuard] },
  {
    path: 'allorders',
    component: AllordersComponent,
    title: 'Fresh Cart',
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:cartId',
    component: CheckoutComponent,
    title: 'Fresh Cart',
    canActivate: [authGuard],
  },
  { path: 'forgotpassword', component: ForgotpasswordComponent, title: 'Fresh Cart' },

  { path: '**', component: NotFoundComponent, title: 'Fresh Cart' },
];
