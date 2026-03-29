import { HttpClient } from '@angular/common/http';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient);

  addProductToWishlist(productId: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/wishlist`, { productId });
  }

  removeProductFromWishlist(productId: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`);
  }

  getWishlistItems(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
}
